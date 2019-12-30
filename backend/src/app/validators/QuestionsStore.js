import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schemaBody = Yup.object().shape({
      question: Yup.string().required(),
    });

    const schemaParams = Yup.object().shape({
      id: Yup.number().required(),
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
