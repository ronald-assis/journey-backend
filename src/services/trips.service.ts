import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import { ITripCreate, ITripCreateResponse } from '../types/trips.types';
import { TripsModel } from '../models/trips.model';
import { getMailClient } from '../lib/mail';

export class TripsService {
  async createTrip(data: ITripCreate): Promise<ITripCreateResponse> {
    const {
      destination,
      ends_at,
      emails_to_invite,
      owner_name,
      starts_at,
      owner_email,
    } = data;

    if (dayjs(starts_at).isBefore(new Date())) {
      throw new Error('Invalid trip start date!');
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new Error('Invalid trip end date!');
    }

    const trip = await TripsModel.createTrip({
      destination,
      starts_at,
      ends_at,
      participants: {
        createMany: {
          data: [
            {
              name: owner_name,
              email: owner_email,
              is_owner: true,
              is_confirmed: true,
            },
            ...emails_to_invite.map((email: string) => ({ email })),
          ],
        },
      },
    });

    const formattedStartDate = dayjs(starts_at).format('LL');
    const formattedEndDate = dayjs(ends_at).format('LL');

    const confirmationLink = `http://localhost:3333/api/trips/${trip.id}/confirm`;

    const mail = await getMailClient();

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'oi@plann.er',
      },
      to: {
        name: owner_name,
        address: owner_email,
      },
      subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
      html: `
         <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
            <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong>, Brasil nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
            <p></p>
            <p>Para confirmar sua viagem, Clique no link abaixo:</p>
            <p></p>
            <p>
                <a href="${confirmationLink}">Confirmar Viagem</a>
            </p>
            <p></p>
            <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
         </div>
      `.trim(),
    });

    console.log(nodemailer.getTestMessageUrl(message));

    return { tripId: trip.id };
  }
}
