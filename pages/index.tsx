import { Inter } from 'next/font/google';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <main className={`${inter.className} min-h-screen bg-background`}>
      <section className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            Welcome to MenuQR
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Revolutionize your dining experience with our digital menu solution.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Our intuitive interface makes it simple for customers to browse menus.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contactless Ordering</CardTitle>
              <CardDescription>
                Minimize contact and streamline ordering with our QR code system.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customizable Menus</CardTitle>
              <CardDescription>
                Easily update your menu items, prices, and descriptions in real-time.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/get-started"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
```

2. Next, let's update the Tailwind CSS configuration to add some modern design defaults:

```yaml