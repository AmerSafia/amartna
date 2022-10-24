export default {
    name: "population",
    title: "Population",
    type: "document",
    fields: [
      {
        name: "name",
        title: "name",
        type: "string",
      },
      {
        name: "image",
        title: "image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "phone",
        title: "Phone",
        type: "number",
      },
      {
        name: "numApartment",
        title: "NumApartment",
        type: "string",
      },
      {
        name: "description",
        title: "description",
        type: "string",
      },
    ],
  };
  