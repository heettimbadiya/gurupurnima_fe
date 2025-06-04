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
import { toast } from 'react-hot-toast';

interface RegistrationFormProps {
    onSubmit: (data: {
        firstName: string
        middleName?: string
        lastName: string
        whatsappNumber: string
        center: string
        age: number
        willTeachersFeeBeTaken: string
        photo: string | null
    }) => void
}

const centers = [
    "સૌરાષ્ટ્ર સેન્ટર",
    "સોહમ સેન્ટર",
    "સુમન સૂરજ સેન્ટર",
    "સુમન બાળ સંસ્કાર ધ્યાન કેન્દ્ર",
    "સોહમ બાળ કેન્દ્ર",
    "સાધના બાળ કેન્દ્ર",
    "રાજનંદની કેન્દ્ર",
    "શુભ સામુહિક ધ્યાન સેન્ટર",
    "વેદાંત સામુહિક ધ્યાન સેન્ટર",
    "યોગીરાજ સેન્ટર",
    "હરેકૃષ્ણ સેન્ટર",
    "સૂર્યકિરણ સેન્ટર",
    "સુવિધા સેન્ટર",
    "વ્રજવિલા સેન્ટર",
    "શુભમ સેન્ટર",
    "જય યોગેશ્વર સેન્ટર",
    "જીવનદીપ સેન્ટર",
    "તક્ષશિલા સેન્ટર",
    "સમર્પણ બાળ કેન્દ્ર",
    "વ્રજવિલા બાળ કેન્દ્ર",
    "નીલકમલ સેન્ટર",
    "જય સરદાર સેન્ટર",
    "યમુનાકુંજ સેન્ટર",
    "પ્રેરણા સેન્ટર",
    "મહાવીર સેન્ટર",
    "સુમન સંગિની સેન્ટર",
    "વિશ્વનગર સ્થાઈ સેન્ટર",
    "રચના બાળ કેન્દ્ર",
    "બાલ વિકાસ કેન્દ્ર",
    "સુંદરબાગ સેન્ટર",
    "સાધના સામુહિક ધ્યાન સેન્ટર",
    "ગુરુનગર સેન્ટર",
    "કેયૂર સેન્ટર"
]

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [gender, setGender] = useState("")
    const [lastName, setLastName] = useState("")
    const [whatsappNumber, setWhatsappNumber] = useState("")
    const [center, setCenter] = useState("")
    const [age, setAge] = useState("")
    const [teachersFeeTaken, setTeachersFeeTaken] = useState("")
    const [willTeachersFeeBeTaken, setWillTeachersFeeBeTaken] = useState("")
    const [photo, setPhoto] = useState<any>(null)
    const [photoFile, setPhotoFile] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        gender: false,
        whatsappNumber: false,
        center: false,
        age: false,
        willTeachersFeeBeTaken: false,
        photo: false,
    })

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setPhotoFile(file)
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
        setLoading(true)

        const newErrors = {
            firstName: !firstName,
            lastName: !lastName,
            gender: !gender,
            whatsappNumber: !whatsappNumber,
            center: !center,
            age: !age || isNaN(Number(age)) || Number(age) <= 0,
            willTeachersFeeBeTaken: !willTeachersFeeBeTaken,
            photo: !photo,
        }

        setErrors(newErrors)

        const hasErrors = Object.values(newErrors).some(error => error)

        if (!hasErrors) {

            try {
                const formPayload = new FormData()
                formPayload.append("firstName", firstName)
                if (middleName) formPayload.append("middleName", middleName)
                formPayload.append("lastName", lastName)
                formPayload.append("whatsappNumber", whatsappNumber)
                formPayload.append("center", center)
                formPayload.append("gender", gender)
                formPayload.append("age", String(age))
                formPayload.append("willTeachersFeeBeTaken", willTeachersFeeBeTaken)

                if (photoFile instanceof File || photoFile instanceof Blob) {
                    formPayload.append("photo", photoFile)
                } else {
                    console.warn("Photo is not a valid file.")
                }

                const res = await axios.post(
                    "https://gurupurnima-be.onrender.com/api/students",
                    formPayload,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )

                if (res.data && res.status == 201) {
                    onSubmit(res.data)
                    toast.success(
                        "User registration successfully"
                    )
                }else {
                    toast.error(
                        "Something want wrong!"
                    )
                }
            } catch (error) {
                console.error("Error submitting form:", error)
            }
        }
        setLoading(false)
    }
    const handleGujaratiInput = (value: string) => {
        return value.replace(/[^a-zA-Z\u0A80-\u0AFF\s]/g, '');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <ul className="list-disc list-inside text-[12px] text-gray-700">
                <li>૫ વર્ષ થી ઉપર ના બાળકો માટે રિજીટ્રેશન ફરજીયાત છે.</li>
                <li>બધી માહિતી ઇંગ્લિશ માં ભરવી ફરજીયાત છે.</li>
                <li>આ ફોર્મ માત્ર વરાછા ઝોન માટે જ છે.</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">અટક *</Label>
                    <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(handleGujaratiInput(e.target.value))}
                        placeholder="અટક દાખલ કરો"
                        className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">અટક ભરવી જરૂરી છે</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="middleName">
                        પોતાનુ નામ</Label>
                    <Input
                        id="middleName"
                        value={middleName}
                        onChange={(e) => setMiddleName(handleGujaratiInput(e.target.value))}
                        placeholder="પોતાનુ નામ દાખલ કરો (વૈકલ્પિક)"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lastName">
                        પિતાનું નામ *</Label>
                    <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) =>  setLastName(handleGujaratiInput(e.target.value))}
                        placeholder="પિતાનું નામ દાખલ કરો"
                        className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">પિતાનું નામ ભરવું જરૂરી છે</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">વોટ્સએપ નંબર *</Label>
                    <Input
                        id="whatsappNumber"
                        value={whatsappNumber}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d{0,10}$/.test(val)) {
                                setWhatsappNumber(val);
                            }
                        }}
                        placeholder="વોટ્સએપ નંબર દાખલ કરો"
                        className={errors.whatsappNumber ? "border-red-500" : ""}
                        type="tel"
                        maxLength={10}
                    />
                    {errors.whatsappNumber && <p className="text-red-500 text-sm">વોટ્સએપ નંબર ભરવો જરૂરી છે</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="center">
                        સેન્ટર *</Label>
                    <Select value={center} onValueChange={setCenter}>
                        <SelectTrigger className={errors.center ? "border-red-500" : ""}>
                            <SelectValue placeholder="વિકલ્પ પસંદ કરો" />
                        </SelectTrigger>
                        <SelectContent>
                            {centers.map((item: string) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.center && <p className="text-red-500 text-sm">સેન્ટર પસંદ કરવું જરૂરી છે</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="age">ઉંમર *</Label>
                    <Select value={age} onValueChange={setAge}>
                        <SelectTrigger className={errors.age ? "border-red-500" : ""}>
                            <SelectValue placeholder="વિકલ્પ પસંદ કરો" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 100 }, (_, i) => i + 1).map((item) => (
                                <SelectItem key={item} value={item.toString()}>
                                    {item}
                                </SelectItem>

                            ))}

                        </SelectContent>
                    </Select>
                    {errors.age && <p className="text-red-500 text-sm">માન્ય ઉંમર ભરવી જરૂરી છે</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gender">ઝેન્ડર  *</Label>
                    <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                            <SelectValue placeholder="વિકલ્પ પસંદ કરો" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">પુરુષ</SelectItem>
                            <SelectItem value="Female">સ્ત્રી</SelectItem>
                            <SelectItem value="Other">અન્ય</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && (
                        <p className="text-red-500 text-sm">કૃપા કરીને લિંગ પસંદ કરો</p>
                    )}
                </div>


                <div className="space-y-2">
                    <Label htmlFor="willTeachersFeeBeTaken">ગુરુદિક્ષા લેવાની છે? *</Label>
                    <Select value={willTeachersFeeBeTaken} onValueChange={setWillTeachersFeeBeTaken}>
                        <SelectTrigger className={errors.willTeachersFeeBeTaken ? "border-red-500" : ""}>
                            <SelectValue placeholder="વિકલ્પ પસંદ કરો" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">હા</SelectItem>
                            <SelectItem value="No">ના</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.willTeachersFeeBeTaken && <p className="text-red-500 text-sm">કૃપા કરીને એક વિકલ્પ પસંદ કરો</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="photo">ફોટો *</Label>
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
                                    <span>{photo ? "ફોટો બદલો" : "ફોટો અપલોડ કરો"}</span>
                                </div>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {errors.photo && <p className="text-red-500 text-sm mt-2">ફોટો જરૂરી છે</p>}
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            ફોટો કાર્ડ પર ગોળ ફ્રેમમાં પ્રદર્શિત થશે
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "સબમિટ કરી રહ્યું છે..." : "રજિસ્ટ્રેશન કાર્ડ જનરેટ કરો"}
            </Button>
        </form>
    )
}
