"use client"

import { useEffect, useRef, useState } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Printer, Share2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import QRCodeStyling from "qr-code-styling"

export default function QRPage() {
  const { settings } = useRestaurant()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  // Obtener la URL del menú
  const menuUrl = typeof window !== "undefined" ? `${window.location.origin}/menu` : ""

  useEffect(() => {
    if (!qrRef.current || !menuUrl) return

    // Crear el código QR con estilo
    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: menuUrl,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 8,
      },
      dotsOptions: {
        color: "#ea580c",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#ea580c",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#ea580c",
        type: "dot",
      },
    })

    qrCodeRef.current.append(qrRef.current)
  }, [menuUrl])

  const handleDownloadPNG = () => {
    if (!qrCodeRef.current) return
    qrCodeRef.current.download({
      name: "menu-qr-code",
      extension: "png",
    })
    toast({
      title: "QR descargado",
      description: "El código QR se ha descargado como imagen PNG",
    })
  }

  const handleDownloadSVG = () => {
    if (!qrCodeRef.current) return
    qrCodeRef.current.download({
      name: "menu-qr-code",
      extension: "svg",
    })
    toast({
      title: "QR descargado",
      description: "El código QR se ha descargado como imagen SVG",
    })
  }

  const handlePrint = () => {
    window.print()
    toast({
      title: "Imprimiendo",
      description: "Se ha abierto el diálogo de impresión",
    })
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl)
      setCopied(true)
      toast({
        title: "URL copiada",
        description: "El enlace del menú se ha copiado al portapapeles",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Menú - ${settings.name}`,
          text: "Consulta nuestro menú digital con disponibilidad en tiempo real",
          url: menuUrl,
        })
      } catch (err) {
        // Usuario canceló el compartir
      }
    } else {
      handleCopyUrl()
    }
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <QrCode className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Código QR del Menú</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Descarga e imprime este código QR para que tus clientes accedan al menú digital
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* QR Code Display */}
            <Card className="print-area">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{settings.name}</CardTitle>
                <CardDescription>Escanea para ver el menú</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div ref={qrRef} className="mb-4" />
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">Menú Digital</p>
                  <p className="text-xs text-muted-foreground">Disponibilidad en tiempo real</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-6 no-print">
              <Card>
                <CardHeader>
                  <CardTitle>Descargar Código QR</CardTitle>
                  <CardDescription>Descarga el código en diferentes formatos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleDownloadPNG} className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Descargar PNG
                  </Button>
                  <Button onClick={handleDownloadSVG} variant="outline" className="w-full gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Descargar SVG (Alta calidad)
                  </Button>
                  <Button onClick={handlePrint} variant="outline" className="w-full gap-2 bg-transparent">
                    <Printer className="w-4 h-4" />
                    Imprimir
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compartir Enlace</CardTitle>
                  <CardDescription>Comparte el enlace directo al menú</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={menuUrl}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted"
                    />
                    <Button
                      onClick={handleCopyUrl}
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0 bg-transparent"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button onClick={handleShare} variant="outline" className="w-full gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Instrucciones de Uso</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800 space-y-2">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Descarga el código QR en formato PNG o SVG</li>
                    <li>Imprime el código en tamaño A4 o más grande para mejor visibilidad</li>
                    <li>Coloca el código QR en lugares visibles: mesas, entrada, menús físicos</li>
                    <li>Los clientes escanean el código con la cámara de su teléfono</li>
                    <li>Acceden instantáneamente al menú con disponibilidad actualizada</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Consejos</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-amber-800 space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Usa el formato SVG para impresiones de alta calidad</li>
                    <li>Coloca el QR a la altura de los ojos para fácil escaneo</li>
                    <li>Asegúrate de que haya buena iluminación donde coloques el código</li>
                    <li>Actualiza la disponibilidad desde el panel de administración</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
