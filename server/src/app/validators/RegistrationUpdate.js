import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schemaBody = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    const schemaParams = Yup.object().shape({
      id: Yup.number(),
    });

    await schemaBody.validate(req.body, { abortEarly: false });
    await schemaParams.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation Fails', messages: err.inner });
  }
};
