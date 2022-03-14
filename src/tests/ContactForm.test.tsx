import { screen, waitFor, act } from "@testing-library/react";
import { ContactForm } from "components/forms/ContactForm";
import { getById, render } from "../test-utils";

const handleSubmit = jest.fn();

const initialValues = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "1234567890",
};

const initialValuesWithEmptyFirstName = {
  lastName: "Doe",
  phoneNumber: "1234567890",
  firstName: "",
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
  it("should show required error on first submitting, when firstName is not provided", async () => {
    render(
      <ContactForm
        initialValues={initialValuesWithEmptyFirstName}
        onSubmit={handleSubmit}
      />
    );
    const submitButtonElement = screen.getByText(/submit/i);
    expect(submitButtonElement).toBeInTheDocument();
    expect(screen.queryByText(/first name is required/i)).toBeNull();
    await act(async () => {
      submitButtonElement.click();
    });
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  });

  it("should show maxLength error on first submitting, when firstName is too long", async () => {
    render(
      <ContactForm
        initialValues={{
          ...initialValuesWithEmptyFirstName,
          firstName: "dasisteinsehrsehrlangervorname",
        }}
        onSubmit={handleSubmit}
      />
    );
    const submitButtonElement = screen.getByText(/submit/i);
    expect(submitButtonElement).toBeInTheDocument();
    expect(
      screen.queryByText(/first name must be 15 characters or less/i)
    ).toBeNull();
    await act(async () => {
      submitButtonElement.click();
    });
    expect(
      screen.getByText(/first name must be 15 characters or less/i)
    ).toBeInTheDocument();
  });
});
