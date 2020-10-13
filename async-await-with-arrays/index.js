"use strict";

const getArrayOfPromises = async () => {
  return [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
};

const mapOverEntries = async () => {
  const data = await getArrayOfPromises();
  const arrayOfResolvedPromises = await Promise.all(await data.map(async (entry) => await entry ));
  arrayOfResolvedPromises.forEach(entry => console.log(entry));
};

const reduceOverEntries = async () => {
  const data = await getArrayOfPromises();
  const updatedData = await data.reduce(async (acc, entry) => {
    const accumulator = await acc;
    const resolvedEntry = await entry;
    accumulator.push(resolvedEntry + 1);
    return accumulator;
  }, Promise.resolve([]));
  updatedData.forEach(entry => console.log(entry));
};

const runEverything = async () => {
  console.log('First we will map over the entries and print them to the console');
  await mapOverEntries();
  console.log('Then we will add 1 to each entry through our reduce function and print them to the console again');
  await reduceOverEntries();
}

runEverything();