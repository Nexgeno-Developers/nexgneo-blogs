<!-- 076d1ee3-040c-4d67-b8ef-2fd8e7b61906 a1acaf00-8732-4e24-834e-a421b9f1cd08 -->
# Services Multi-Select Integration Plan

## 1. Update Prisma Schema

Add three new array fields to the `Services` model in `prisma/schema.prisma`:

```prisma
model Services {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  image     String
  altTag    String?
  title     String
  desc      String
  slug      String  @unique
  metaTitle String
  metaDesc  String
  content   String
  series      Int?
  whyChoose String?
  showInMenu   Boolean?
  menuTitle String?
  schema String?
  portfolioIds String[] @default([]) @db.ObjectId
  clientIds String[] @default([]) @db.ObjectId      // NEW
  technologyIds String[] @default([]) @db.ObjectId  // NEW
  resultIds String[] @default([]) @db.ObjectId      // NEW

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

After updating, run:

- `npx prisma generate`
- `npx prisma db push`

## 2. Update Services Add Form

File: `app/(admin)/admin/services/new/_components/add-services-form.tsx`

### Changes needed:

1. **Import MediaSelect** instead of ImageUpload:
```typescript
import MediaSelect from "@/components/media/MediaSelect";
```

2. **Add props interface** to accept clients, technologies, and results:
```typescript
interface AddServicesFormProps {
  portfolios: Portfolio[];
  clients: any[];        // NEW
  technologies: any[];   // NEW
  results: any[];        // NEW
}
```

3. **Update formSchema** to include new fields:
```typescript
const formSchema = z.object({
  // ... existing fields
  portfolioIds: z.array(z.string()).optional().default([]),
  clientIds: z.array(z.string()).optional().default([]),      // NEW
  technologyIds: z.array(z.string()).optional().default([]),  // NEW
  resultIds: z.array(z.string()).optional().default([]),      // NEW
});
```

4. **Update defaultValues** in useForm:
```typescript
defaultValues: {
  // ... existing defaults
  portfolioIds: [],
  clientIds: [],      // NEW
  technologyIds: [],  // NEW
  resultIds: [],      // NEW
},
```

5. **Replace ImageUpload with MediaSelect** for the image field (around lines 102-115):
```typescript
<FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <FormControl>
        <MediaSelect
          value={field.value}
          onChange={field.onChange}
          resourceType="image"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

6. **Add three new MultiSelect fields** after the portfolioIds field (after line ~285):
```typescript
{/* Our Clients Multi-Select */}
<FormField
  control={form.control}
  name="clientIds"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Related Clients</FormLabel>
      <FormControl>
        <MultiSelect
          options={clients.map((c) => ({
            value: c.id,
            label: c.name,
            image: c.logo || undefined,
          }))}
          selected={field.value}
          onChange={field.onChange}
          placeholder="Select clients..."
          disabled={isSubmitting}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Our Technologies Multi-Select */}
<FormField
  control={form.control}
  name="technologyIds"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Related Technologies</FormLabel>
      <FormControl>
        <MultiSelect
          options={technologies.map((t) => ({
            value: t.id,
            label: t.title,
            image: t.image || undefined,
          }))}
          selected={field.value}
          onChange={field.onChange}
          placeholder="Select technologies..."
          disabled={isSubmitting}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Our Results Multi-Select */}
<FormField
  control={form.control}
  name="resultIds"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Related Results</FormLabel>
      <FormControl>
        <MultiSelect
          options={results.map((r) => ({
            value: r.id,
            label: r.title,
            image: r.icon || undefined,
          }))}
          selected={field.value}
          onChange={field.onChange}
          placeholder="Select results..."
          disabled={isSubmitting}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```


## 3. Update Services Add Page

File: `app/(admin)/admin/services/new/page.tsx`

Fetch clients, technologies, and results and pass them to the form:

```typescript
import { db } from "@/lib/db";
import { AddServicesForm } from "./_components/add-services-form";
import { getPortfolios } from "@/actions/getPortfolios";

const NewServices = async () => {
  const portfolios = await getPortfolios();
  
  const clients = await db.client.findMany({
    orderBy: { name: "asc" },
  });

  const technologies = await db.technology.findMany({
    orderBy: { title: "asc" },
  });

  const results = await db.result.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <>
      <AddServicesForm 
        portfolios={portfolios} 
        clients={clients}
        technologies={technologies}
        results={results}
      />
    </>
  );
};

export default NewServices;
```

## 4. Update Services Update Form

File: `app/(admin)/admin/services/[serviceId]/_components/update-service-form.tsx`

### Changes needed:

1. **Import MediaSelect**:
```typescript
import MediaSelect from "@/components/media/MediaSelect";
```

2. **Update props interface**:
```typescript
interface UpdateServiceFormProps {
  data: Services | null;
  portfolios: Portfolio[];
  clients: any[];        // NEW
  technologies: any[];   // NEW
  results: any[];        // NEW
}
```

3. **Update formSchema**:
```typescript
const formSchema = z.object({
  // ... existing fields
  portfolioIds: z.array(z.string()).optional().default([]),
  clientIds: z.array(z.string()).optional().default([]),      // NEW
  technologyIds: z.array(z.string()).optional().default([]),  // NEW
  resultIds: z.array(z.string()).optional().default([]),      // NEW
});
```

4. **Update defaultValues**:
```typescript
defaultValues: {
  // ... existing defaults
  portfolioIds: (data as any)?.portfolioIds || [],
  clientIds: (data as any)?.clientIds || [],           // NEW
  technologyIds: (data as any)?.technologyIds || [],   // NEW
  resultIds: (data as any)?.resultIds || [],           // NEW
},
```

5. **Replace ImageUpload with MediaSelect** (around lines 121-138):
```typescript
<FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Image</FormLabel>
      <FormControl>
        <MediaSelect
          value={field.value}
          onChange={field.onChange}
          resourceType="image"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

6. **Add three new MultiSelect fields** after portfolioIds (after line ~299):
```typescript
{/* Our Clients Multi-Select */}
<FormField
  control={form.control}
  name="clientIds"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Related Clients</FormLabel>
      <FormControl>
        <MultiSelect
          options={clients.map((c) => ({
            value: c.id,
            label: c.name,
            image: c.logo || undefined,
          }))}
          selected={field.value}
          onChange={field.onChange}
          placeholder="Select clients..."
          disabled={isSubmitting}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Our Technologies Multi-Select */}
<FormField
  control={form.control}
  name="technologyIds"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Related Technologies</FormLabel>
      <FormControl>
        <MultiSelect
          options={technologies.map((t) => ({
            value: t.id,
            label: t.title,
            image: t.image || undefined,
          }))}
          selected={field.value}
          onChange={field.onChange}
          placeholder="Select technologies..."
          disabled={isSubmitting}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Our Results Multi-Select */}
<FormField
  control={form.control}
  name="resultIds"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Related Results</FormLabel>
      <FormControl>
        <MultiSelect
          options={results.map((r) => ({
            value: r.id,
            label: r.title,
            image: r.icon || undefined,
          }))}
          selected={field.value}
          onChange={field.onChange}
          placeholder="Select results..."
          disabled={isSubmitting}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```


## 5. Update Services Update Page

File: `app/(admin)/admin/services/[serviceId]/page.tsx`

Fetch and pass clients, technologies, and results:

```typescript
import { db } from "@/lib/db";
import { UpdateServiceForm } from "./_components/update-service-form";
import { getPortfolios } from "@/actions/getPortfolios";

const ServicesIdPage = async ({
  params,
}: {
  params: { serviceId: string };
}) => {
  const services = await db.services.findUnique({
    where: {
      id: params.serviceId,
    },
  });

  const portfolios = await getPortfolios();

  const clients = await db.client.findMany({
    orderBy: { name: "asc" },
  });

  const technologies = await db.technology.findMany({
    orderBy: { title: "asc" },
  });

  const results = await db.result.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <>
      <UpdateServiceForm 
        data={services} 
        portfolios={portfolios}
        clients={clients}
        technologies={technologies}
        results={results}
      />
    </>
  );
};

export default ServicesIdPage;
```

## Summary of Changes

### Files to Modify:

1. `prisma/schema.prisma` - Add clientIds, technologyIds, resultIds fields
2. `app/(admin)/admin/services/new/_components/add-services-form.tsx` - Replace ImageUpload with MediaSelect, add three new multi-selects
3. `app/(admin)/admin/services/new/page.tsx` - Fetch and pass clients, technologies, results
4. `app/(admin)/admin/services/[serviceId]/_components/update-service-form.tsx` - Replace ImageUpload with MediaSelect, add three new multi-selects
5. `app/(admin)/admin/services/[serviceId]/page.tsx` - Fetch and pass clients, technologies, results

### Key Features:

- Multi-select dropdowns with search functionality
- Display of selected items with images and names
- Ability to remove selected items with X button
- All selections saved as arrays of IDs in the database
- MediaSelect for main service image with preview functionality
- Consistent UX with existing Portfolio multi-select

### To-dos

- [ ] Add Result model to Prisma schema with all required fields
- [ ] Run npx prisma generate and npx prisma db push
- [ ] Create POST API route at /api/results/route.ts
- [ ] Create PATCH and DELETE API routes at /api/results/[resultId]/route.ts
- [ ] Build Results admin list page with DataTable
- [ ] Create columns component for Results table
- [ ] Create cell actions component with Update/Delete dropdown
- [ ] Create add result page at /admin/results/new
- [ ] Build add result form with MediaSelect for icon and image
- [ ] Create update result page at /admin/results/[resultId]
- [ ] Build update result form with pre-populated data
- [ ] Add Our Results link to admin sidebar navigation