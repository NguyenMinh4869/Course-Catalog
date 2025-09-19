# Course Catalog - Testing Documentation

This directory contains comprehensive unit tests for the Course Catalog application, with a focus on the CourseCard component.

## Test Structure

```
__tests__/
├── setup.ts                           # Global test setup and mocks
├── README.md                          # This documentation
components/__tests__/
├── course-card.test.tsx               # Main CourseCard component tests
├── course-card-animations.test.tsx    # Animation and hover effect tests
└── course-card-responsive.test.tsx    # Responsive design tests
lib/__tests__/
└── difficulty-colors.test.ts          # Utility function tests
types/__tests__/
└── course.test.ts                     # Type definition tests
```

## Test Coverage

### CourseCard Component Tests (`course-card.test.tsx`)

**Rendering Tests:**
- ✅ Renders all required elements (card, header, content, footer)
- ✅ Displays course title, description, and image correctly
- ✅ Shows difficulty badge with proper text
- ✅ Displays duration and student count
- ✅ Shows clock and users icons

**Button Behavior:**
- ✅ Displays "Start Learning" for non-enrolled courses
- ✅ Displays "Continue" for enrolled courses
- ✅ Button is clickable and accessible

**Progress Section:**
- ✅ Hides progress for non-enrolled courses
- ✅ Shows progress for enrolled courses
- ✅ Displays correct progress percentage

**Edge Cases:**
- ✅ Handles missing course image (fallback to placeholder)
- ✅ Handles very long titles and descriptions
- ✅ Handles undefined progress values
- ✅ Handles 0% and 100% progress values

**Accessibility:**
- ✅ Proper alt text for images
- ✅ Proper button accessibility
- ✅ Correct semantic structure

### Animation Tests (`course-card-animations.test.tsx`)

**Hover Animations:**
- ✅ Card lift effect (`hover:-translate-y-1`)
- ✅ Enhanced shadow on hover (`hover:shadow-xl`)
- ✅ Image scale effect (`group-hover:scale-110`)
- ✅ Badge scale effect (`group-hover:scale-105`)
- ✅ Title color change (`group-hover:text-primary`)
- ✅ Description color change (`group-hover:text-muted-foreground/80`)

**Progress Animations:**
- ✅ Progress section scale (`group-hover:scale-[1.02]`)
- ✅ Progress bar height increase (`group-hover:h-2.5`)
- ✅ Progress text color changes

**Icon Animations:**
- ✅ Clock and users icon containers scale
- ✅ Duration and student count text color changes

**Overlay Animations:**
- ✅ Image overlay effect (`group-hover:bg-black/10`)

**Animation Timing:**
- ✅ Consistent 300ms duration for most animations
- ✅ 500ms duration for image scaling
- ✅ Ease-out timing for smooth animations

### Responsive Design Tests (`course-card-responsive.test.tsx`)

**Image Responsiveness:**
- ✅ Full width and fixed height (`w-full h-48`)
- ✅ Object cover for aspect ratio maintenance

**Typography Responsiveness:**
- ✅ Line clamp for text truncation (`line-clamp-2`, `line-clamp-3`)
- ✅ Consistent font sizing

**Layout Responsiveness:**
- ✅ Proper spacing and padding
- ✅ Responsive gap classes
- ✅ Full-width button

**Container Responsiveness:**
- ✅ Overflow handling
- ✅ Border radius application
- ✅ Proper container classes

### Utility Function Tests (`difficulty-colors.test.ts`)

**Color Mapping:**
- ✅ Correct colors for all difficulty levels
- ✅ Case-insensitive matching
- ✅ Default colors for unknown difficulties

**Edge Cases:**
- ✅ Handles empty strings, null, undefined
- ✅ Returns proper object structure

### Type Definition Tests (`course.test.ts`)

**Type Safety:**
- ✅ Validates Course interface structure
- ✅ Tests Difficulty type values
- ✅ Edge cases for property types

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test course-card.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="Animation"
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Uses Next.js Jest configuration
- JSDOM environment for React testing
- Path mapping for `@/` imports
- Coverage thresholds: 80% for all metrics
- Excludes UI components and test files from coverage

### Test Setup (`__tests__/setup.ts`)
- Global test setup and mocks
- Next.js router and navigation mocks
- next-themes mock
- Console warning suppression
- Browser API mocks (ResizeObserver, IntersectionObserver, matchMedia)

## Mocking Strategy

### Component Mocks
- **UI Components**: Mocked with simple div elements and test IDs
- **Next.js Image**: Mocked to render as img element
- **Lucide Icons**: Mocked with test ID divs
- **Utility Functions**: Mocked with Jest functions

### External Dependencies
- **next/router**: Mocked with Jest functions
- **next/navigation**: Mocked with Jest functions
- **next-themes**: Mocked with default theme values

## Coverage Goals

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Best Practices

1. **Descriptive Test Names**: Clear, specific test descriptions
2. **Arrange-Act-Assert**: Consistent test structure
3. **Mock External Dependencies**: Isolate component logic
4. **Test Edge Cases**: Handle boundary conditions
5. **Accessibility Testing**: Ensure proper ARIA attributes
6. **Responsive Testing**: Verify mobile-first design
7. **Animation Testing**: Validate CSS classes and timing

## Adding New Tests

When adding new tests:

1. Follow the existing naming convention
2. Use descriptive test descriptions
3. Mock external dependencies
4. Test both happy path and edge cases
5. Include accessibility considerations
6. Update this documentation

## Troubleshooting

### Common Issues

1. **Import Errors**: Check path mapping in Jest config
2. **Mock Issues**: Verify mock setup in test files
3. **Coverage Issues**: Check coverage thresholds and exclusions
4. **Type Errors**: Ensure proper TypeScript configuration

### Debug Commands

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests with debug information
npm test -- --detectOpenHandles

# Run specific test with debug
npm test -- --testNamePattern="CourseCard" --verbose
```
