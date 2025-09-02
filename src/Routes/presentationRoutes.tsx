import PresentationLayout from "../Layouts/PresentationLayout";
import LandingPage from "../features/Home/pages/LandingPage";

export const presentationRoutes = {
  path: '/v1',
  element: <PresentationLayout />,
  children: [
    {
      index: true,
      element: <LandingPage />
    }
  ]
};
