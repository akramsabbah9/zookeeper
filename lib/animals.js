const fs = require("fs");
const path = require("path");

const filterByQuery = function(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // save personalityTraits as a dedicated array
        // if it's a string, place into new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }
        else {
            personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filteredResults array
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

const findById = function(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

// add animal to animals.json and animals array
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished data to the POST route for response
    return animal;
}

const validateAnimal = function(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};