import * as Yup from 'yup';

const TwilioSchema = (props) => Yup.object().shape({
  channel_name: Yup.string()
    .test(
      'unique-config-name',
      'Twilio config name is not unique.',
      (value) => {
        const {
          emails, opsGenies, pagerDuties, telegrams, twilios,
        } = props;
        for (let i = 0; i < emails.allIds.length; i += 1) {
          if (emails.byId[emails.allIds[i]].channel_name === value) {
            return false;
          }
        }
        for (let i = 0; i < opsGenies.allIds.length; i += 1) {
          if (opsGenies.byId[opsGenies.allIds[i]].channel_name === value) {
            return false;
          }
        }
        for (let i = 0; i < pagerDuties.allIds.length; i += 1) {
          if (
            pagerDuties.byId[pagerDuties.allIds[i]].channel_name === value
          ) {
            return false;
          }
        }
        for (let i = 0; i < telegrams.allIds.length; i += 1) {
          if (telegrams.byId[telegrams.allIds[i]].channel_name === value) {
            return false;
          }
        }
        for (let i = 0; i < twilios.allIds.length; i += 1) {
          if (twilios.byId[twilios.allIds[i]].channel_name === value) {
            return false;
          }
        }
        return true;
      },
    )
    .required('Config name is required.'),
  account_sid: Yup.string().required('Account Sid is required.'),
  auth_token: Yup.string().required('Authentication token is required.'),
  twilio_phone_num: Yup.string().required('Twilio phone number is required.'),
  twilio_phone_numbers_to_dial: Yup.array().required(
    'Phone numbers to dial are required.',
  ),
});

export default TwilioSchema;
