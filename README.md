# Betterquest

Next.js web app that helps riders and hikers document trail issues by uploading photos that automatically extract GPS
coordinates.

![Betterquest](https://vimeo.com/1129443364?share=copy&fl=sv&fe=ci)

## Features

- **Photo Upload:** Take or upload photos of trail issues directly from your device
- **Automatic Location Extraction:** Retrieve GPS coordinates from image metadata
- **Interactive Map:** View and explore reported trail issues on a map
- **Shareable Links:** Generate and share unique links to keep riders updated

## Technologies

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Storage:** [Supabase](https://supabase.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Reader:** [Exifr](https://github.com/MikeKovarik/exifr)
- **Toasts:** [Sonner](https://sonner.emilkowal.ski/)
- **Icons:** [Lucide](https://lucide.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) installed
- An active [Supabase](https://supabase.com) project

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/benjaminpfleghaar/betterquest.git
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Create a `.env.local` file and add your credentials:

    ```
    NEXT_PUBLIC_SUPABASE_URL=<YOUR_URL>
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<YOUR_KEY>
    ```

4. Create a database `locations` with the following schema:

    ```
    id           int8
    slug         text
    image        text
    created_at   timestamptz
    latitude     numeric
    longitude    numeric
    description  text
    type         text
    ```

5. Create a bucket named `images`

    ```
   Add "SELECT" and "INSERT" policy
    ```

6. Run the development server:

    ```
    npm run dev
    ```