import nodemailer from 'nodemailer';
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"

import { ITripCreate, ITripCreateResponse } from '../types/trips.types';
import {TripsModel} from '../models/tripsModel'

dayjs.locale('pt-br')
dayjs.extend(localizedFormat)

export class TripsService {
  private readonly model: TripsModel

  constructor() {
    this.model = new TripsModel()
  }

  public async createTrip(data: ITripCreate): Promise<ITripCreateResponse> {
    const {
      destination,
      ends_at,
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

    const trip = await this.model.createTrips(data);

    const formattedStartDate = dayjs(starts_at).format('LL');
    const formattedEndDate = dayjs(ends_at).format('LL');
    const account = await nodemailer.createTestAccount()

    const confirmationLink = `http://localhost:3333/api/trips/${trip.id}/confirm`;

    const mail = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass,
        }
    })

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
