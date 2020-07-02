const cosmosClient = require("../../cosmosDB/CosmosDBClient");
const customer = require("../models/Customer");

class CustomerDao {
  constructor(containerId) {
    this.containerId = containerId;
  }

  async init() {
    this.container = await cosmosClient.connectToContainer(this.containerId);
  }

  async getCustomers() {
    // query to return all items
    const querySpec = {
      query: "SELECT c from c where c.id = '1'"
    };
    return await this.container.items.query(querySpec).fetchAll();
  }

  async createCustomer(body) {
    customer.fname = body.fname;
    customer.lname = body.lname;
    customer.email = body.email;
    customer.phone = body.phone;
    customer.addresses = [];
    var { resource: createdCustomer } = await this.container.items.create(
      customer
    );
    return createdCustomer;
  }
}

module.exports = CustomerDao;
