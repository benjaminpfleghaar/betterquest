"use server";

export const createLink = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(formData);
};
