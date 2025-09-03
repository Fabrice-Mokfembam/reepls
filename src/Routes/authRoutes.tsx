import AuthLayout from "../Layouts/AuthLayout";
import WelcomeScreen from "../features/Auth/pages/WelcomeScreen";
import EmailRegistrationEmail from "../features/Auth/pages/EmailRegistration/Email";
import EmailRegistrationPassword from "../features/Auth/pages/EmailRegistration/Password";
import EmailRegistrationName from "../features/Auth/pages/EmailRegistration/Name";
import EmailRegistrationEmailCodeCheck from "../features/Auth/pages/EmailRegistration/EmailCodeCheck";
import PhoneRegistrationPhone from "../features/Auth/pages/PhoneRegistration/Phone";
import PhoneRegistrationPassword from "../features/Auth/pages/PhoneRegistration/Password";
import PhoneRegistrationName from "../features/Auth/pages/PhoneRegistration/Name";
import PhoneRegistrationPhoneCodeCheck from "../features/Auth/pages/PhoneRegistration/PhoneCodeCheck";
import LoginWithPhone from "../features/Auth/pages/Login/LoginWithPhone";
import Interests from "../features/Auth/pages/Interests/Interests";
import LoginWithEmail from "../features/Auth/pages/Login/LoginWithEmail";

export const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <WelcomeScreen />
    },
    {
      path: 'signup',
      children: [
        {
          path: 'email',
          element: <EmailRegistrationEmail />
        },
        {
          path: 'email/password',
          element: <EmailRegistrationPassword />
        },
        {
          path: 'email/name',
          element: <EmailRegistrationName />
        },
        {
          path: 'email/code-check',
          element: <EmailRegistrationEmailCodeCheck />
        },
        {
          path: 'phone',
          element: <PhoneRegistrationPhone />
        },
        {
          path: 'phone/password',
          element: <PhoneRegistrationPassword />
        },
        {
          path: 'phone/name',
          element: <PhoneRegistrationName />
        },
        {
          path: 'phone/code-check',
          element: <PhoneRegistrationPhoneCodeCheck />
        },
        {
          path: 'interests',
          element: <Interests />
        }
      ]
    },
    {
      path: 'signin',
      children: [
        {
          path: 'email',
          element: <LoginWithEmail />
        },
        {
          path: 'phone',
          element: <LoginWithPhone />
        }
      ]
    }
  ]
};
