export async function fetchData() {
  try {
    let repsonseData = await fetch("/data/data.json");
    let data = await repsonseData.json();

    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error(error);
  }
}
