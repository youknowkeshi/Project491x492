import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function CardWithForm() {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          asdas
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
