import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Badge,
  Separator,
} from '@thesage/ui';

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">My Sage App</h1>
        <p className="text-muted-foreground">
          Built with the Sage Design Engine. Edit{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">app/page.tsx</code>{' '}
          to get started.
        </p>
      </div>

      <Separator />

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
            <CardDescription>
              92 accessible components built on Radix UI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">Button</Badge>
              <Badge variant="secondary">Card</Badge>
              <Badge variant="outline">Dialog</Badge>
              <Badge variant="success" dot>Active</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <a href="https://thesage.dev/docs#components" target="_blank" rel="noopener noreferrer">
                Browse Components
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Themes</CardTitle>
            <CardDescription>
              Three themes with light/dark mode support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge>Studio</Badge>
              <Badge variant="secondary">Terra</Badge>
              <Badge variant="outline">Volt</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <a href="https://thesage.dev/docs#themes" target="_blank" rel="noopener noreferrer">
                Explore Themes
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Example Form */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Form Example</CardTitle>
          <CardDescription>
            SDE form components with accessible labels and inputs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
