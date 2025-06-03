"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload } from "lucide-react"
import axios from "axios"

interface RegistrationFormProps {
  onSubmit: (data: {
    registerNumber: string
    firstName: string
    middleName?: string
    lastName: string
    whatsappNumber: string
    center: string
    age: number
    teachersFeeTaken: string
    willTeachersFeeBeTaken: string
    photo: string | null
  }) => void
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [registerNumber, setRegisterNumber] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [center, setCenter] = useState("")
  const [age, setAge] = useState("")
  const [teachersFeeTaken, setTeachersFeeTaken] = useState("")
  const [willTeachersFeeBeTaken, setWillTeachersFeeBeTaken] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [errors, setErrors] = useState({
    registerNumber: false,
    firstName: false,
    lastName: false,
    whatsappNumber: false,
    center: false,
    age: false,
    teachersFeeTaken: false,
    willTeachersFeeBeTaken: false,
    photo: false,
  })

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhoto(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors = {
      registerNumber: !registerNumber,
      firstName: !firstName,
      lastName: !lastName,
      whatsappNumber: !whatsappNumber,
      center: !center,
      age: !age || isNaN(Number(age)) || Number(age) <= 0,
      teachersFeeTaken: !teachersFeeTaken,
      willTeachersFeeBeTaken: !willTeachersFeeBeTaken,
      photo: !photo,
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error)

    if (!hasErrors) {
      const formData = {
        registerNumber,
        firstName,
        middleName: middleName || undefined,
        lastName,
        whatsappNumber,
        center,
        age: Number(age),
        teachersFeeTaken,
        willTeachersFeeBeTaken,
        photo, // Make sure this is a File/Blob if it's an image
      };

      onSubmit(formData);

      try {
        const formPayload = new FormData();
        formPayload.append("registerNumber", registerNumber);
        formPayload.append("firstName", firstName);
        if (middleName) formPayload.append("middleName", middleName);
        formPayload.append("lastName", lastName);
        formPayload.append("whatsappNumber", whatsappNumber);
        formPayload.append("center", center);
        formPayload.append("age", String(age));
        formPayload.append("teachersFeeTaken", teachersFeeTaken);
        formPayload.append("willTeachersFeeBeTaken", willTeachersFeeBeTaken);

        // Append photo if it exists and is a File
        if (photo instanceof File || photo instanceof Blob) {
          formPayload.append("photo", photo);
        } else {
          console.warn("Photo is not a valid file.");
        }

        await axios.post(
            "https://gurupurnima-be.onrender.com/api/students",
            formPayload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="registerNumber">Registration Number *</Label>
          <Input
              id="registerNumber"
              value={registerNumber}
              onChange={(e) =>  {
                const value = e.target.value
                if (value.length <= 3) {
                  setRegisterNumber(value)
                }
              }}
              placeholder="Enter registration number"
              className={errors.registerNumber ? "border-red-500" : ""}
              maxLength={3}

          />
          {errors.registerNumber && <p className="text-red-500 text-sm">Registration number is required</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
                id="middleName"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Enter middle name (optional)"
            />
          </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="text-red-500 text-sm">Last name is required</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
          <Input
              id="whatsappNumber"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Enter WhatsApp number"
              className={errors.whatsappNumber ? "border-red-500" : ""}
              type="tel"
              maxLength={10}
          />
          {errors.whatsappNumber && <p className="text-red-500 text-sm">WhatsApp number is required</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="center">Center *</Label>
          <Input
              id="center"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              placeholder="Enter center name"
              className={errors.center ? "border-red-500" : ""}
          />
          {errors.center && <p className="text-red-500 text-sm">Center is required</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className={errors.age ? "border-red-500" : ""}
              type="number"
              min="1"
              max="120"
          />
          {errors.age && <p className="text-red-500 text-sm">Valid age is required</p>}
        </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teachersFeeTaken">Teachers Fee Taken *</Label>
            <Select value={teachersFeeTaken} onValueChange={setTeachersFeeTaken}>
              <SelectTrigger className={errors.teachersFeeTaken ? "border-red-500" : ""}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.teachersFeeTaken && <p className="text-red-500 text-sm">Please select an option</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="willTeachersFeeBeTaken">Will Teachers Fee Be Taken *</Label>
            <Select value={willTeachersFeeBeTaken} onValueChange={setWillTeachersFeeBeTaken}>
              <SelectTrigger className={errors.willTeachersFeeBeTaken ? "border-red-500" : ""}>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            {errors.willTeachersFeeBeTaken && <p className="text-red-500 text-sm">Please select an option</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo">Photo *</Label>
          <Card className={`border-2 border-dashed ${errors.photo ? "border-red-500" : "border-gray-300"} rounded-lg`}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              {photo ? (
                  <div className="relative w-40 h-40 mb-4">
                    <img
                        src={photo || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                        onClick={() => setPhoto(null)}
                    >
                      ×
                    </Button>
                  </div>
              ) : (
                  <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
              )}

              <div className="flex items-center justify-center">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100">
                    <Upload className="h-4 w-4" />
                    <span>{photo ? "Change Photo" : "Upload Photo"}</span>
                  </div>
                  <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              </div>
              {errors.photo && <p className="text-red-500 text-sm mt-2">Photo is required</p>}
              <p className="text-xs text-gray-500 mt-2 text-center">
                Photo will be displayed in a circular frame on the card
              </p>
            </CardContent>
          </Card>
        </div>

        <Button type="submit" className="w-full">
          Generate Registration Card
        </Button>
      </form>
  )
}