"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"

interface RegistrationCardProps {
  name: string
  regNumber: string
  photo: string
}

export default function RegistrationCard({ name, regNumber, photo }: RegistrationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      await document.fonts.ready

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        removeContainer: true,
        onclone: (clonedDoc: any) => {
          const clonedElement: any = clonedDoc.querySelector('[data-card-ref]') as HTMLElement
          if (clonedElement) {
            const screenWidth = clonedDoc.defaultView?.innerWidth || 0;
            const regElement = clonedElement.querySelector('#pos')
            if (regElement) {
              regElement.style.position = 'absolute'
              regElement.style.top = '13%'
              regElement.style.left = '7%'
              regElement.style.width = '64px'
              regElement.style.height = '64px'
              regElement.style.display = 'flex'
              regElement.style.alignItems = 'center'
              regElement.style.justifyContent = 'center'
              regElement.style.textAlign = 'center'

                if (screenWidth < 450) {
                  regElement.style.top = '11.5%'
                  regElement.style.left = '5.5%'
                }

              // Target the inner text div
              const innerText = regElement.querySelector('.reg-number-text')
              if (innerText) {
                innerText.style.display = 'flex'
                innerText.style.alignItems = 'center'
                innerText.style.justifyContent = 'center'
                innerText.style.width = '100%'
                innerText.style.height = '100%'
                innerText.style.fontWeight = '700'
                innerText.style.lineHeight = '1'
                innerText.style.textAlign = 'center'
              }
            }
          }
        }
      })

      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `registration-card-${regNumber}.png`
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
    }
  }

  return (
      <div className="flex flex-col items-center w-full">
        <div
            ref={cardRef}
            data-card-ref="true"
            className="relative w-full max-w-md bg-white mx-auto"
            style={{ aspectRatio: "9/16" }}
        >
          <img src="/card-template.png" alt="Card Template" className="w-full h-auto" crossOrigin="anonymous" />

          <div className="absolute inset-0">
            <div
                id="pos"
                className="absolute flex justify-center top-[17.5%] left-[5.5%] md:left-[6.5%]"
                style={{
                  width: '64px',
                  height: '64px',
                  textAlign: 'center'
                }}
            >
              <div
                  className="reg-number-text text-md md:text-lg text-red-800 font-bold"
                  style={{
                    fontWeight: '700',
                    lineHeight: '1',
                    textAlign: 'center',
                  }}
              >
                {regNumber.padStart(2, "0")}
              </div>
            </div>

            <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2">
              <div className="w-[165px] h-[165px] sm:w-[210px] sm:h-[210px] rounded-full overflow-hidden">
                <img
                    src={photo || "/placeholder.svg?height=160&width=160"}
                    alt={name}
                    className="w-full h-full object-cover object-center"
                    crossOrigin="anonymous"
                    style={{ objectPosition: "center center" }}
                />
              </div>
            </div>

            <div className="absolute top-[63%] sm:top-[63.5%] left-1/2 transform -translate-x-1/2 text-center w-full px-6">
              <div className="text-red-800 font-bold text-md md:text-lg uppercase tracking-wide leading-tight text-center">
                {name}
              </div>
            </div>
          </div>
        </div>

        <Button onClick={downloadCard} className="mt-6">
          <Download className="mr-2 h-4 w-4" /> Download Card
        </Button>
      </div>
  )
}