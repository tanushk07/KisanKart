const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

module.exports.getForm = async (req, res) => {
  res.render("indexKrishi");
};
module.exports.getAssessment = async (req, res) => {
  const { soil, location, temperature } = req.body;

  async function run() {
    const preferredModels = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-8b",
      "gemini-1.5-pro",
    ];

    async function generateWithFallback(
      contents,
      options = {},
      maxRetries = 3
    ) {
      let lastError;
      for (const modelName of preferredModels) {
        const model = genAI.getGenerativeModel({ model: modelName });
        let delayMs = 500;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            const payload = { contents };
            if (options && options.responseMimeType) {
              payload.generationConfig = {
                responseMimeType: options.responseMimeType,
              };
            }
            return await model.generateContent(payload);
          } catch (err) {
            const status = err && err.status;
            if (status === 429 || status === 500 || status === 503) {
              lastError = err;
              await new Promise((r) => setTimeout(r, delayMs));
              delayMs = Math.min(delayMs * 2, 8000);
              continue;
            }
            lastError = err;
            break;
          }
        }
      }
      throw lastError;
    }

    function parseJsonFromText(text) {
      try {
        return JSON.parse(text);
      } catch (_) {
        // Try extracting from fenced code block
        const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (fenceMatch && fenceMatch[1]) {
          const inner = fenceMatch[1].trim();
          try {
            return JSON.parse(inner);
          } catch (_) {}
        }
        // Try substring between first { and last }
        const start = text.indexOf("{");
        const end = text.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
          const candidate = text.substring(start, end + 1);
          try {
            return JSON.parse(candidate);
          } catch (_) {}
        }
        throw new Error("Failed to parse JSON from model response");
      }
    }

    const partsCropSuitability = [
      {
        text: `On the basis of the given features:

                1. *Crop Suitability Assessment*
                
                Given that the location of ones cultivating land is in ${location}, the soil type is ${soil}, along with a temperature range of ${temperature} in Celsius. Suggest suitable crops that can be grown in different seasons based on the following:
                
                - Pre-determined crop suitability guidelines for different soil types and climates.
                - Historical agricultural data and best practices for the region.
                - Potential market demand for specific crops.
                
                Provide the result as a JSON object in the following format:
                "
                {
                    crops: [
                        {
                            "crop_name": "String",
                            "features": ["String"]
                        }
                    ],
                    AdditionalConsiderations: ["String"]
                }
                "     
                Ensure that there are no errors in the response JSON Object and try to make it as parsable as possible.
                There should be no extraneous punctuations attached to the JSON Object. Don't respond with unexpected tokens before and after the json format to avoid any syntactical errors, do not give bullet points in the features under crop_name.
                `,
      },
    ];

    const resultCropSuitability = await generateWithFallback(
      [{ role: "user", parts: partsCropSuitability }],
      { responseMimeType: "application/json" }
    );

    let cropSuitabilityData = parseJsonFromText(
      resultCropSuitability.response.text()
    );

    const irrigationRequests = cropSuitabilityData.crops.map((crop) => ({
      text: `On the basis of the given features:

            1. *Irrigation Schedule Recommendations*
            
            Given that the crop type chosen is ${crop.crop_name} kind, nature of soil being ${soil} and location of land being in ${location} hence the related weather to that location. Suggest irrigation recommendations along with the following features according to the data mentioned above:
            
            - Suggested watering frequency and duration.
            - Estimated water quantity required per irrigation cycle.
            - Considerations for adjusting schedules based on rainfall and temperature fluctuations.
            
            Provide the result as a JSON object in the following format:
            "
            {
                irrigation_schedule: {
                    "watering_frequency": "String",
                    "water_quantity_per_cycle": "String",
                    "adjustments_based_on_weather": ["String"]
                }
            }
            "     
            Ensure that there are no errors in the response JSON Object and try to make it as parsable as possible.
            There should be no extraneous punctuations attached to the JSON Object. Don't respond with unexpected tokens before and after the json format to avoid any syntactical errors.
            `,
    }));

    const irrigationResponses = [];
    for (const partsIrrigation of irrigationRequests) {
      const resp = await generateWithFallback(
        [{ role: "user", parts: [partsIrrigation] }],
        { responseMimeType: "application/json" }
      );
      irrigationResponses.push(resp);
      await new Promise((r) => setTimeout(r, 200));
    }

    let irrigationData = irrigationResponses.map((response) =>
      parseJsonFromText(response.response.text())
    );

    const partsResourceManagement = [
      {
        text: `Provide educational resources and best practices on:
                
                - Efficient irrigation methods (e.g., drip irrigation, rainwater harvesting).
                - Fertilizer application techniques (e.g., soil testing, balanced fertilization).
                - Integrated Pest Management (IPM) strategies to minimize pesticide use.
                - Soil health improvement practices (e.g., cover cropping, composting).
                
                Provide the result as a JSON object in the following format:
                "
                {
                    resource_management_tips: [
                        {
                            "topic": "String",
                            "tips": ["String"]
                        }
                    ]
                }
                "     
                Ensure that there are no errors in the response JSON Object and try to make it as parsable as possible.
                There should be no extraneous punctuations attached to the JSON Object. Don't respond with unexpected tokens before and after the json format to avoid any syntactical errors.
                `,
      },
    ];

    const resultResourceManagement = await generateWithFallback(
      [{ role: "user", parts: partsResourceManagement }],
      { responseMimeType: "application/json" }
    );

    let resourceManagementData = parseJsonFromText(
      resultResourceManagement.response.text()
    );

    const irrigationDataWithCropNames = cropSuitabilityData.crops.map(
      (crop, index) => ({
        crop_name: crop.crop_name,
        irrigation_schedule: irrigationData[index].irrigation_schedule,
      })
    );

    res.render("data", {
      cropData: cropSuitabilityData,
      irrigationData: irrigationDataWithCropNames,
      resourceManagementData: resourceManagementData,
    });
  }

  run();
};
