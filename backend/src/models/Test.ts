import { Document, Schema, model, Model } from "mongoose";

interface ITest extends Document {
  name: string;
  age: number;
  credentials: {
    username: string;
    password: string;
  };
}

type TTestModel = Model<ITest>;

const testSchema = new Schema<ITest, TTestModel>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  credentials: {
    type: {
      username: { type: String, required: true },
      password: { type: String, required: true },
    },
    required: true,
  },
});

const TestModel = model<ITest, TTestModel>("tests", testSchema);

async function run() {
  try {
    const testCreated: ITest = await TestModel.create({
      name: "baghdad",
      age: 27,
      credentials: { username: "bb", password: "aa" },
    });
    if (testCreated) {
      console.log(testCreated.credentials.username);
      console.log(testCreated._id);
      console.log(testCreated.age);
    }
    const testRetrieved: ITest | null = await TestModel.findOne({
      name: "bahgdad",
    });
    if (testRetrieved) {
      console.log(testRetrieved._id);
    }
    const tests: ITest[] = await TestModel.find({ name: "baghdad" });
  } catch (err) {
    console.log(err);
  }
}
