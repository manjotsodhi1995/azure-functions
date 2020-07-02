const CosmosClient = require("@azure/cosmos").CosmosClient;
const dbContext = require("./databaseContext");
const config = require("../config");
const { endpoint, key, databaseId } = config;

const client = new CosmosClient({ endpoint, key });

module.exports.connectToContainer = async function (containerId) {
    console.log('container id',containerId);
    const database = client.database(databaseId);
    const container = database.container(containerId);
    await dbContext.create(client, databaseId, containerId);
    return container;
};