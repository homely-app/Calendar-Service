var db = require('./models/');

class FakeDataGenerator {
  constructor() {
    this.hello = 'world';
  }
  createData() {
    let data;
    return data;
  }
}

let myFactory = new FakeDataGenerator();
let fakeData = myFactory.createData();
