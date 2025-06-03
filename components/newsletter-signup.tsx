import { Mail, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsletterSignup() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Subscribe to Our Newsletter</CardTitle>
        <CardDescription className="text-center">
          Get the latest updates, news, and special offers sent directly to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="flex items-center justify-center gap-2">
            <Github className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:inline-block">GitHub</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2">
            <Twitter className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:inline-block">Twitter</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:inline-block">LinkedIn</span>
          </Button>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-2">
          <form className="flex flex-col space-y-2">
            <Input type="email" placeholder="Enter your email" className="h-11" required />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white h-11">
              Subscribe Now
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm text-gray-500">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
        </div>
        <p>We respect your privacy. Unsubscribe at any time.</p>
      </CardFooter>
    </Card>
  )
}
