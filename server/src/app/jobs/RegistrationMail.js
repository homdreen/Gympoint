import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
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
        age: newRegistration.Student.age,
        height: newRegistration.Student.height,
        weight: newRegistration.Student.weight,
        plan_name: newRegistration.Plan.title,
        duration: newRegistration.Plan.duration,
        start_date: format(
          parseISO(newRegistration.start_date),
          "'Dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(newRegistration.end_date),
          "'Dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        price: newRegistration.price,
      },
    });
  }
}

export default new RegistrationMail();
