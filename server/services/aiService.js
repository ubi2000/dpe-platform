const analyzeProperty = (property) => {
    let score = 0

    //size impcat
    if (property.size < 50) score += 2;
    else if (property.size < 100) score += 1

    // cons year
    if (property.constructionYear > 2015) score += 3;
    else if (property.constructionYear > 2000) score += 2;
    else if (property.constructionYear > 1980) score += 1;


    //  Heating 
    if (property.heatingType === "electric") score += 2;
    if (property.heatingType === "gas") score += 1;

    //  Window tyep
    if (property.windowType === "double") score += 2;
    if (property.windowType === "triple") score += 3;

    let rating;
    if (score >= 7) rating = "A"
    else if (score >= 6) rating = "B";
    else if (score >= 5) rating = "C";
    else if (score >= 4) rating = "D";
    else if (score >= 3) rating = "E";
    else if (score >= 2) rating = "F";
    else rating = "G";

    //energy Values
    const energyConsumption = 50 + (7 - score) * 50
    const co2Emission = 5 + (7 - score) * 5

    //Recomm
    const recommendation = []

    if (property.windowType === "single") {
        recommendation.push("Upgrade to double=glazed windows")

    }
    if (property.constructionYear < 2000) {
        recommendation.push("Improve insulation");
    }

    if (property.heatingType === "oil") {
        recommendation.push("Switch to energy-efficient heating");
    }
    return {
        rating,
        energyConsumption,
        co2Emission,
        recommendation
    }
}
module.exports = { analyzeProperty }