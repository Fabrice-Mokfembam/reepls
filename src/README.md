# Reepls Admin Dashboard - Folder Structure

## Overview
This project follows a feature-based architecture that's intuitive for new developers to understand and navigate.

## Folder Structure

```
src/
├── features/                    # Feature-based modules
│   ├── dashboard/              # Dashboard feature
│   │   ├── components/         # Dashboard-specific components
│   │   ├── pages/             # Dashboard pages
│   │   ├── hooks/             # Dashboard-specific hooks
│   │   ├── utils/             # Dashboard utilities
│   │   └── types/             # Dashboard type definitions
│   ├── user-management/       # User management feature
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   ├── activity-log/          # Activity logging feature
│   ├── profile/               # User profile feature
│   └── settings/              # Settings feature
├── shared/                    # Shared across features
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Global custom hooks
│   ├── services/              # API services
│   ├── utils/                 # Global utilities
│   ├── types/                 # Global type definitions
│   └── constants/             # App constants
├── layouts/                   # Layout components
├── contexts/                  # React contexts
└── assets/                    # Static assets
    ├── icons/
    ├── images/
    └── fonts/
```

## Color System
The app uses a custom color system defined in `index.css`:
- **Primary**: Green shades (`primary-400` is the main color)
- **Secondary**: Yellow shades
- **Neutral**: Gray shades for backgrounds and text
- **Background**: Light/dark theme support

## Usage Examples

### Using Colors
```tsx
<div className="bg-primary-400 text-neutral-800">
  Primary button
</div>
<div className="bg-neutral-800 text-foreground">
  Dark card
</div>
```

### Adding New Features
1. Create a new folder in `src/features/`
2. Add the standard subfolders: `components/`, `pages/`, `hooks/`, `utils/`, `types/`
3. Follow the existing patterns for components and types

### Shared Components
Place reusable components in `src/shared/components/` that can be used across multiple features.

## Key Features Implemented
- ✅ Admin layout with sidebar and header
- ✅ Dashboard with metrics cards
- ✅ Time period selector
- ✅ Engagement chart placeholder
- ✅ Recent users list
- ✅ Responsive design
- ✅ Dark theme with custom colors
