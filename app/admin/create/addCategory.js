export default async function addCategory(entry, data) {
  //   const createData = createCategory(entry, data);
  const { name, shortName, image, description } = data;

  let shortname, array, desc;

  if (shortName === "") {
    shortname = name.toLowerCase();
    array = shortname.split(/ and| &|, /);
    shortname = array[0];
    shortname = shortname.replace(/\s/g, "-");
  } else shortname = shortName;
  if (description === "") {
    desc = name;
  } else desc = description;

  const createData = await fetch("/api/create", {
    body: JSON.stringify({
      entry: entry,
      name: name,
      shortName: shortname,
      image: image,
      description: desc,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return createData;
}
