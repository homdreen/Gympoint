import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class HelpOrderAnswered {
  get key() {
    return 'HelpOrderAnswered';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: `${helpOrder.Student.name} <${helpOrder.Student.email}>`,
      subject: 'Seu pedido de auxílio foi respondido!',
      template: 'answered',
      context: {
        student: helpOrder.Student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answered_at: format(
          parseISO(helpOrder.answer_at),
          "'Dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new HelpOrderAnswered();
