export default {
    name: "expense",
    title: "Expense",
    type: "document",
    fields: [
        {
            name: "name",
            title: "name",
            type: "string",
        },
        {
            name: "date",
            title: "Date",
            type: "date",
        },
        {
            name: "amount",
            title: "Amount",
            type: "number",
        },
        {
            name: "description",
            title: "description",
            type: "string",
        },
    ],
};
