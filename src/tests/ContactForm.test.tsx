import { screen, queryByAttribute, waitFor, act } from "@testing-library/react";
import { ContactForm } from "../components/forms/ContactForm";
import { render } from "../test-utils";

const getById = queryByAttribute.bind(null, "id");

const handleSubmit = jest.fn();

const initialValues = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "1234567890",
};

describe("ContactForm", () => {
  it("should render correct with empty initialValues", () => {
    const renderedForm = render(<ContactForm onSubmit={handleSubmit} />);
    const firstNameElement = getById(renderedForm.container, "firstName");
    const lastNameElement = getById(renderedForm.container, "lastName");
    const phoneNumberElement = getById(renderedForm.container, "phoneNumber");
    expect(firstNameElement).toBeInTheDocument();
    expect(firstNameElement).toHaveValue("");
    expect(lastNameElement).toBeInTheDocument();
    expect(lastNameElement).toHaveValue("");
    expect(phoneNumberElement).toBeInTheDocument();
    expect(phoneNumberElement).toHaveValue("");
  });

  it("should render correct with provided initialValues", () => {
    const renderedForm = render(
      <ContactForm initialValues={initialValues} onSubmit={handleSubmit} />
    );
    const firstNameElement = getById(renderedForm.container, "firstName");
    const lastNameElement = getById(renderedForm.container, "lastName");
    const phoneNumberElement = getById(renderedForm.container, "phoneNumber");
    expect(firstNameElement).toBeInTheDocument();
    expect(firstNameElement).toHaveValue(initialValues.firstName);
    expect(lastNameElement).toBeInTheDocument();
    expect(lastNameElement).toHaveValue(initialValues.lastName);
    expect(phoneNumberElement).toBeInTheDocument();
    expect(phoneNumberElement).toHaveValue(initialValues.phoneNumber);
  });

  it("should call onSubmit when form is submitted", async () => {
    render(
      <ContactForm initialValues={initialValues} onSubmit={handleSubmit} />
    );
    const submitButtonElement = screen.getByText(/submit/i);
    expect(submitButtonElement).toBeInTheDocument();
    await act(async () => {
      submitButtonElement.click();
    });
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(initialValues)
    );
  });
});
