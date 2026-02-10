# Service Data Usage Guide

## Quick Reference

### Import the Data

```javascript
import allServicesData, { getServiceById, getAllServices, getServiceTitles } from "../data/ServicesData";
```

### Get Single Service
```javascript
// By ID
const service = getServiceById('enterprise-it');

// By slug
const service = getServiceById('talent-solutions');

// Available IDs: 'enterprise-it', 'talent-solutions', 'ai-analytics'
```

### Get All Services
```javascript
const services = getAllServices();
// Returns array of all 3 services
```

### Get Service Titles (for navigation)
```javascript
const titles = getServiceTitles();
// Returns: [
//   { id: 'enterprise-it', slug: 'enterprise-it', title: 'Enterprise IT' },
//   { id: 'talent-solutions', slug: 'talent-solutions', title: 'Talent Solutions' },
//   { id: 'ai-analytics', slug: 'ai-analytics', title: 'AI & Analytics' }
// ]
```

## Current Implementation in Services.jsx

```javascript
// 1. Get service data
const currentService = useMemo(() => {
  return getServiceById(serviceId) || allServicesData[0];
}, [serviceId]);

// 2. Access service properties
currentService.hero.title           // "Enterprise IT Managed Services."
currentService.hero.description     // Full description
currentService.hero.backgroundImage // Background image URL

// 3. Loop through sections
currentService.sections.map(section => {
  section.id       // "sap-services"
  section.title    // "Enterprise SAP Managed Services"
  section.icon     // Lucide icon component
  section.cards    // Array of service cards
})

// 4. Loop through features
currentService.features.map(feature => {
  feature.title    // Feature title
  feature.desc     // Feature description
  feature.icon     // Lucide icon component
})

// 5. Access CTA data
currentService.cta.title       // CTA title
currentService.cta.text        // CTA description
currentService.cta.buttonText  // Button label
```

## To Add a New Service

1. **Open** `src/data/ServicesData.js`
2. **Add new service object to `allServicesData` array**:

```javascript
{
  id: "your-service-id",
  slug: "your-service-slug",
  title: "Your Service Title",
  hero: {
    title: "Hero Title",
    description: "Hero Description",
    backgroundImage: "image-url"
  },
  sections: [
    {
      id: "section-1",
      title: "Section Title",
      icon: IconComponent,
      cards: [
        {
          title: "Card Title",
          desc: "Card Description",
          icon: IconComponent
        }
      ]
    }
  ],
  features: [
    {
      title: "Feature Title",
      desc: "Feature Description",
      icon: IconComponent
    }
  ],
  cta: {
    title: "CTA Title",
    text: "CTA Text",
    buttonText: "Button Label"
  }
}
```

3. **Update App.jsx route** (if needed):
```javascript
<Route path='/services/:serviceId' element={<Services />} />
```

4. **Update Services.jsx** to use URL params (optional):
```javascript
const { serviceId } = useParams();
// Then use getServiceById(serviceId)
```

## Service IDs Reference

| Service | ID | Slug |
|---------|-------|--------|
| Enterprise IT | `enterprise-it` | `enterprise-it` |
| Talent Solutions | `talent-solutions` | `talent-solutions` |
| AI & Analytics | `ai-analytics` | `ai-analytics` |

## Icon Components Available

All icons are imported from `lucide-react`:
- Layers, Database, Settings, BarChart3, Globe, Cloud, Server, etc.
- See `ServicesData.js` imports for complete list

## Component Props

### SectionCard Component
```javascript
<SectionCard item={card} />
// card object: { title, desc, icon }
```

### FeatureCard Component
```javascript
<FeatureCard item={feature} />
// feature object: { title, desc, icon }
```

### ScrollNav Component
```javascript
<ScrollNav 
  sections={currentService.sections}
  activeSection={activeSection}
  scrollToSection={scrollToSection}
/>
```

## Notes

- All icon components must be imported in ServicesData.js
- Each card and feature must have a valid icon from lucide-react
- Service IDs must be unique and URL-safe
- Background images should be complete URLs (not local paths)
- The component is optimized for performance using useMemo()
