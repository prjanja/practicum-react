const rootPath = "http://localhost:3000/practicum-react";

const ingredientsSelector = "[class^=burger-ingredients_ingredient__]";
const modalTitleSelector = "[class^=modal_title]";

describe("HomePahe modal test", () => {
  before(() => {
    cy.visit(rootPath);
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("should by availible", () => {
    cy.get("h1").should("contain", "Собери бургер");
  });

  it("should open ingredient modal", () => {
    cy.get(modalTitleSelector).should("not.exist");
    cy.get(ingredientsSelector).first().click();
    cy.get(modalTitleSelector).should("contain", "Детали ингредиента");
    cy.get("[class^=ingredient-details_nutrients]")
      .find("div")
      .eq(2)
      .should("not.be.empty");
  });

  it("should close ingredient modal", () => {
    cy.get("[class^=modal_close_icon]").first().click();
    cy.get(modalTitleSelector).should("not.exist");
  });
});

describe("HomePahe DND test", () => {
  before(() => {
    cy.visit(rootPath);
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("should drag and drop ingredients", () => {
    cy.get(ingredientsSelector).first().as("bun");
    cy.get(ingredientsSelector).last().as("ingredient");
    cy.get("[class^=burger-constructor_ingredients_wrapper_]")
      .last()
      .as("target");
    cy.get("@bun").trigger("dragstart");
    cy.get("@bun").trigger("dragleave");
    cy.get("@target").trigger("dragenter");
    cy.get("@target").trigger("dragover");
    cy.get("@target").trigger("drop");
    cy.get("@target").trigger("dragend");

    cy.get("@ingredient").trigger("dragstart");
    cy.get("@ingredient").trigger("dragleave");
    cy.get("@target").trigger("dragenter");
    cy.get("@target").trigger("dragover");
    cy.get("@target").trigger("drop");
    cy.get("@target").trigger("dragend");

    cy.get("@bun").find("[class^=counter]").should("contain", 2);
    cy.get("@ingredient").find("[class^=counter]").should("exist");
  });
});

describe("HomePahe create order test with login", () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.visit(rootPath);
  });

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it("should create order", () => {
    const login = "7@7.7";
    const password = "123456";
    cy.intercept("POST", "**/orders", {
      statusCode: 200,
      ok: true,
      body: {
        success: true,
        name: "Флюоресцентный бургер",
        order: {
          ingredients: [
            {
              _id: "643d69a5c3f7b9001cfa093d",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile:
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large:
                "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0,
            },
          ],
          _id: "644aca3845c6f2001be6e289",
          owner: {
            name: "7",
            email: "7@7.7",
            createdAt: "2023-04-17T17:01:25.842Z",
            updatedAt: "2023-04-17T17:01:25.842Z",
          },
          status: "done",
          name: "Флюоресцентный бургер",
          createdAt: "2023-04-27T19:17:12.406Z",
          updatedAt: "2023-04-27T19:17:12.471Z",
          number: 777,
          price: 988,
        },
      },
    });

    cy.get(ingredientsSelector).first().as("bun");
    cy.get(ingredientsSelector).last().as("ingredient");
    cy.get("[class^=burger-constructor_ingredients_wrapper_]")
      .last()
      .as("target");
    cy.get("@bun").trigger("dragstart");
    cy.get("@bun").trigger("dragleave");
    cy.get("@target").trigger("dragenter");
    cy.get("@target").trigger("dragover");
    cy.get("@target").trigger("drop");
    cy.get("@target").trigger("dragend");

    cy.get("button").should("contain", "Оформить заказ").click();
    cy.get("input").first().type(login);
    cy.get("input").last().type(password);
    cy.get("button").click();
    cy.get("button").should("contain", "Оформить заказ").click();

    cy.get("div").should("contain", "777");
    cy.get("[class^=modal_close_icon]").first().click();
    cy.get(modalTitleSelector).should("not.exist");
  });
});
