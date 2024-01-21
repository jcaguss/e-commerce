import "dotenv/config";
import mongoose from "mongoose";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");
await mongoose.connect(process.env.MONGO_URL);
let cookie = {};

describe("Test Users Sessions ruta api/sessions", function () {
  this.timeout(10000);
  it("Ruta api/sessions/register con metodo POST", async () => {
    const newUser = {
      first_name: "pruebaaa",
      last_name: "prueebaaaaa",
      age: 24,
      email: "prueebaaaa@pruebaaaa.com",
      password: "pruebaaaa1234",
    };
    const { _body } = await requester
      .post("/api/sessions/register")
      .send(newUser);
    expect(_body.payload).to.be.ok;
  });
  // -- User --
  // it("Ruta api/sessions/login con metodo POST", async () => {
  //   const user = {
  //     email: "user@user.com",
  //     password: "12341234",
  //   };
  //   const res = await requester.post("/api/sessions/login").send(user);

  //   const cookieRes = res.headers["set-cookie"][0];
  //   expect(cookieRes).to.be.ok;
  //   cookie = {
  //     name: cookieRes.split("=")[0],
  //     value: cookieRes.split("=")[1].split(";")[0],
  //   };
  //   expect(cookie.name).to.be.ok.and.equal("jwtCookie");
  //   expect(cookie.value).to.be.ok;
  // });
  // -- Admin --
  it("Ruta api/sessions/login con metodo POST", async () => {
    const user = {
      email: "1234@1234.com",
      password: "12341234",
    };
    const res = await requester.post("/api/sessions/login").send(user);

    const cookieRes = res.headers["set-cookie"][0];
    expect(cookieRes).to.be.ok;
    cookie = {
      name: cookieRes.split("=")[0],
      value: cookieRes.split("=")[1].split(";")[0],
    };
    expect(cookie.name).to.be.ok.and.equal("jwtCookie");
    expect(cookie.value).to.be.ok;
  });

  // it("Ruta api/sessions/current con metodo GET", async () => {
  //   const { _body } = await requester
  //     .get("/api/sessions/current")
  //     .set("Authorization", [`${cookie.value}`]);
  //   expect(_body.user.email).to.be.equal("user@user.com");
  // });
});

describe("Test de CRUD de Productos en ruta api/products", function () {
  it("Ruta: api/products metodo GET", async () => {
    const { ok } = await requester.get("/api/products");
    expect(ok).to.be.ok;
  });
  it("Ruta: api/products metodo POST", async () => {
    const newProd = {
      title: "Camion",
      description: "lorem1",
      code: "AUTO1414",
      price: 1234,
      stock: 1234,
      category: "Veiculos"
    };
    const { statusCode, _body, ok } = await requester
      .post("/api/products")
      .set("Authorization", [`${cookie.value}`])
      .send(newProd);
    expect(statusCode).to.be.equal(201)
    expect(_body.respuesta).to.be.equal('ok')
    expect(ok).to.be.ok;

    // console.log(_body)
    // console.log(statusCode)
    // console.log(ok)
  });
  it("Ruta: api/products metodo PUT", async () => {
    const id = "6567ff7bd04a9b79991e7373";
    const updateProd = {
      title: "Televisor antiguo",
      description: "El mejor de los peores",
      code: "ELEC4321",
      price: 1234,
      stock: 1234,
      category: "Electronica",
    };
    const { ok } = await requester
      .put(`/api/products/${id}`)
      .set("Authorization", [`${cookie.value}`])
      .send(updateProd);
    expect(ok).to.be.ok;
  });
  it("Ruta: api/products metodo DELETE", async () => {
    const id = "6567ffc50beae5d02cb0ad82";
    const { ok } = await requester
      .delete(`/api/products/${id}`)
      .set("Authorization", [`${cookie.value}`]);
    expect(ok).to.be.ok;
  });
});

describe("Test Carts ruta api/carts", function () {
  it("Ruta api/cats metodo POST", async () => {
    const cid = "65ad7dae3bef32e4cb263a57";
    const pid = "65503d0ed26df8d639855636";
    const {ok} = await requester
      .post(`/api/carts/${cid}/products/${pid}`)
      .set("Authorization", [`${cookie.value}`]);
    console.log(ok);
    expect(ok).to.be.ok;
  });
});
