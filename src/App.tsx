/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BaseLayout } from './layouts/BaseLayout';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { InsightsPage } from './pages/InsightsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { useRouter } from './scripts/router';

export default function App() {
  const { currentRoute } = useRouter();

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/services/':
        return <ServicesPage />;
      case '/work/':
        return <WorkPage />;
      case '/about/':
        return <AboutPage />;
      case '/insights/':
        return <InsightsPage />;
      case '/contact/':
        return <ContactPage />;
      case '/404/':
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return <BaseLayout currentRoute={currentRoute}>{renderPage()}</BaseLayout>;
}

