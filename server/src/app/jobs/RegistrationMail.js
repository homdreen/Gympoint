import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { newRegistration } = data;

    await Mail.sendMail({
      to: `${newRegistration.Student.name} <${newRegistration.Student.email}>`,
      subject: 'Matrícula realizada com sucesso!',
      template: 'registration',
      context: {
        student: newRegistration.Student.name,
      },
    });
  }
}

export default new RegistrationMail();
