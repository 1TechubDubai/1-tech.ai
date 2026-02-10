# Service Data Implementation Examples

## 1. Creating a Service Navigation Component

```javascript
import { getAllServices } from "../data/ServicesData";

export const ServiceNav = () => {
  const services = getAllServices();

  return (
    <nav className="flex gap-4">
      {services.map(service => (
        <Link 
          key={service.id} 
          to={`/services/${service.slug}`}
          className="px-4 py-2 rounded hover:bg-cyan-500/20"
        >
          {service.title}
        </Link>
      ))}
    </nav>
  );
};
```

## 2. Dynamic Service Routing with URL Parameters

```javascript
// In App.jsx
<Route path='/services/:serviceSlug' element={<Services />} />

// In Services.jsx
import { useParams } from 'react-router-dom';
import { getServiceById } from "../data/ServicesData";

const Services = () => {
  const { serviceSlug } = useParams();
  const currentService = useMemo(() => {
    return getServiceById(serviceSlug) || allServicesData[0];
  }, [serviceSlug]);

  // Rest of component...
};
```

## 3. Service Listing Page

```javascript
import allServicesData from "../data/ServicesData";
import { Link } from 'react-router-dom';

const ServicesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {allServicesData.map(service => (
        <Link 
          key={service.id}
          to={`/services/${service.slug}`}
          className="p-6 rounded-lg border hover:shadow-lg transition"
        >
          <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.hero.description}</p>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded">
            Learn More →
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ServicesList;
```

## 4. Service Breadcrumb Navigation

```javascript
import { useParams } from 'react-router-dom';
import { getServiceById } from "../data/ServicesData";

const ServiceBreadcrumb = () => {
  const { serviceSlug } = useParams();
  const service = getServiceById(serviceSlug);

  return (
    <nav className="flex gap-2 text-gray-400">
      <Link to="/" className="hover:text-white">Home</Link>
      <span>/</span>
      <Link to="/services" className="hover:text-white">Services</Link>
      <span>/</span>
      <span className="text-cyan-400">{service?.title}</span>
    </nav>
  );
};
```

## 5. Service Search/Filter

```javascript
import { useState, useMemo } from 'react';
import allServicesData, { getServiceTitles } from "../data/ServicesData";

const ServiceSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = useMemo(() => {
    return allServicesData.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.hero.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded border"
      />
      
      <div className="mt-6 space-y-4">
        {filtered.map(service => (
          <div key={service.id} className="p-4 border rounded">
            <h3 className="font-bold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.hero.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 6. Service Comparison Component

```javascript
import { getAllServices } from "../data/ServicesData";

const ServiceComparison = () => {
  const services = getAllServices();

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Feature</th>
          {services.map(service => (
            <th key={service.id} className="border p-2">{service.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-2 font-bold">Number of Modules</td>
          {services.map(service => (
            <td key={service.id} className="border p-2 text-center">
              {service.sections.length}
            </td>
          ))}
        </tr>
        <tr>
          <td className="border p-2 font-bold">Key Features</td>
          {services.map(service => (
            <td key={service.id} className="border p-2">
              <ul className="text-sm">
                {service.features.slice(0, 3).map((f, i) => (
                  <li key={i}>• {f.title}</li>
                ))}
              </ul>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
```

## 7. Sidebar Service Navigation

```javascript
import { useParams } from 'react-router-dom';
import { getAllServices } from "../data/ServicesData";

const ServiceSidebar = () => {
  const { serviceSlug } = useParams();
  const services = getAllServices();

  return (
    <aside className="w-64 bg-gray-900 p-6 rounded">
      <h3 className="text-xl font-bold mb-4">All Services</h3>
      <ul className="space-y-2">
        {services.map(service => (
          <li key={service.id}>
            <Link
              to={`/services/${service.slug}`}
              className={`block px-4 py-2 rounded transition ${
                serviceSlug === service.slug
                  ? 'bg-cyan-500 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
```

## 8. Service Card Component (Reusable)

```javascript
const ServiceFeatureGrid = ({ service }) => {
  return (
    <div className="space-y-8">
      {service.sections.map(section => (
        <div key={section.id}>
          <div className="flex items-center gap-3 mb-4">
            <section.icon size={28} className="text-cyan-400" />
            <h3 className="text-xl font-bold">{section.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.cards.map((card, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:shadow-lg transition">
                <div className="flex items-start gap-3">
                  <card.icon size={24} className="text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">{card.title}</h4>
                    <p className="text-sm text-gray-600">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
```

## 9. Hero Banner Component (Reusable)

```javascript
const ServiceHero = ({ service }) => {
  return (
    <section 
      className="relative h-96 rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${service.hero.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex items-center justify-center text-center text-white">
        <div className="max-w-2xl px-6">
          <h1 className="text-4xl font-bold mb-4">{service.hero.title}</h1>
          <p className="text-lg text-gray-200">{service.hero.description}</p>
        </div>
      </div>
    </section>
  );
};
```

## 10. Service Summary Component

```javascript
const ServiceSummary = ({ serviceId }) => {
  const service = getServiceById(serviceId);

  if (!service) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">{service.cta.title}</h2>
      <p className="mb-6 text-gray-100">{service.cta.text}</p>
      <button className="px-6 py-3 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100 transition">
        {service.cta.buttonText}
      </button>
      
      <div className="mt-8 grid grid-cols-3 gap-4">
        {service.features.slice(0, 3).map((feature, idx) => (
          <div key={idx} className="text-center">
            <div className="mb-2">
              <feature.icon size={32} className="mx-auto" />
            </div>
            <p className="font-semibold text-sm">{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Notes

- All examples assume React Router v6+
- Import statements shown for clarity
- CSS classes use Tailwind conventions
- Components are fully composable and reusable
- Follow the existing component patterns in Services.jsx for consistency
