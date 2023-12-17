import supertest from "supertest";
import { faker } from "@faker-js/faker";

import { app } from "../../../../jest.setup";

import { authTestMethods } from "./auth.test.util";
import { IUser } from "../../../models/User";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("POST /auth/", () => {
  describe("Check Email Availability", () => {
    it("should return OK status", async () => {
      const res = await supertest(app)
        .post("/auth/check-email-availability")
        .send({ email: faker.internet.email() });
      expect(res.status).toBe(200);
      expect(res.body.message).toBeDefined();
      expect(typeof res.body.message).toBe("string");
    });
    describe("Email already taken", () => {
      let user: IUser;
      beforeAll(async () => {
        user = (await authTestMethods.createSubscriber()).user;
      });
      afterAll(async () => {
        await authTestMethods.delete(user._id);
      });
      it("should return CONFLICT status", async () => {
        const res = await supertest(app)
          .post("/auth/check-email-availability")
          .send({ email: user.email });
        expect(res.status).toBe(HttpStatusCodes.CONFLICT);
      });
    });
  });

  describe("/local/register/", () => {
    let idUser: string;
    afterAll(async () => {
      if (idUser) {
        await authTestMethods.delete(idUser);
        idUser = "";
      }
    });
    it("should return OK status from local register", async () => {
      const password = faker.internet.password({ length: 10 });
      const userTestData = {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      };
      const res = await supertest(app)
        .post("/auth/local/register")
        .send(userTestData);
      expect(res.status).toBe(HttpStatusCodes.OK);
      idUser = res.body.user._id;
    });
  });

  describe("/local/login/", () => {
    let user: IUser;
    let password: string;
    beforeAll(async () => {
      const userTest = await authTestMethods.createSubscriber();
      user = userTest.user;
      password = userTest.password;
    });
    afterAll(async () => {
      await authTestMethods.delete(user._id);
    });
    it("should return OK status from local login", async () => {
      const res = await supertest(app)
        .post("/auth/local/login")
        .send({ email: user.email, password: password });
      expect(res.status).toBe(HttpStatusCodes.OK);
    });
  });

  describe("JWT Errors", () => {
    it("should return an UNAUTHORIZED status due to the invalid token", async () => {
      const someRandomCategoryData = { name: faker.lorem.word() };
      const fakeToken = `${faker.number.hex(10)}.${faker.number.hex(
        10
      )}.${faker.number.hex(10)}`;
      const res = await supertest(app)
        .post("/category/")
        .set("Authorization", `Bearer ${fakeToken}`)
        .send(someRandomCategoryData);
      expect(res.status).toBe(HttpStatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty("message");
      expect(typeof res.body.message).toBe("string");
      /*
      res.body = { message: 'invalid token' }
       */
    });
    it("should return an UNAUTHORIZED status due to the expired token", async () => {
      const { accessToken, expiresInMilliseconds } =
        authTestMethods.getExpiredToken();
      const someRandomCategoryData = { name: faker.lorem.word() };
      await new Promise((resolve) =>
        setTimeout(resolve, expiresInMilliseconds)
      );
      const res = await supertest(app)
        .post("/category/")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(someRandomCategoryData);
      expect(res.status).toBe(HttpStatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty("message");
      expect(typeof res.body.message).toBe("string");
      /*
      res.body = { message: 'jwt expired' }
       */
    });
  });
});
