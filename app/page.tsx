"use client"

import { useState } from "react"
import RegistrationForm from "@/components/registration-form"
import RegistrationCard from "@/components/registration-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [formData, setFormData] = useState<{
    name: string
    regNumber: string
    photo: string | null
  }>({
    name: "",
    regNumber: "",
    photo: null,
  })

  const [isCardGenerated, setIsCardGenerated] = useState("form")

  const handleFormSubmit = (data:any) => {
    setIsCardGenerated("preview")
    setFormData({name:`${data.firstName} ${data.middleName} ${data.lastName}`,regNumber:data.registerNumber,photo:data.photo})
  }
  const handleTabs = (value:string) =>{
    setIsCardGenerated(value)
  }

  return (
      <main className="min-h-screen  bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">Registration Card Generator</h1>
        <p className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">Created by JBS Technology</p>

        <Tabs value={isCardGenerated} defaultValue={"form"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" onClick={() => handleTabs("form")}>Create Card</TabsTrigger>
            <TabsTrigger value="preview" onClick={() => handleTabs("preview")} disabled={isCardGenerated == "form"}>
              Preview Card
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-0">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <RegistrationForm onSubmit={handleFormSubmit} />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            {isCardGenerated && (
              <div className="flex flex-col items-center">
                <RegistrationCard
                  name={formData.name}
                  regNumber={formData.regNumber}
                  photo={formData.photo || "/placeholder.svg?height=200&width=200"}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
