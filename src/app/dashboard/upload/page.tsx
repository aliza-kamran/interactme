@@ .. @@
 'use client'

-import { useState } from 'react'
+import { useState, useEffect } from 'react'
 import { useSession } from 'next-auth/react'
 import { useRouter } from 'next/navigation'
 import { Button } from '@/components/ui/button'
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
-import { Upload, FileText, Loader2 } from 'lucide-react'
+import { Upload, FileText, Loader2, Download, Eye, ExternalLink } from 'lucide-react'
 import { toast } from 'sonner'

 export default function UploadPage() {
   const [file, setFile] = useState<File | null>(null)
   const [uploading, setUploading] = useState(false)
+  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
+  const [uploadedFlyer, setUploadedFlyer] = useState<any>(null)
   const { data: session } = useSession()
   const router = useRouter()

+  useEffect(() => {
+    // Check if a template was selected
+    const template = localStorage.getItem('selectedTemplate')
+    if (template) {
+      setSelectedTemplate(JSON.parse(template))
+      localStorage.removeItem('selectedTemplate')
+    }
+  }, [])
+
   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
     const selectedFile = event.target.files?.[0]
     if (selectedFile) {
@@ .. @@
       formData.append('file', file)
+      if (selectedTemplate) {
+        formData.append('templateId', selectedTemplate.id)
+      }

       const response = await fetch('/api/flyers/upload', {
@@ .. @@
       if (response.ok) {
         const result = await response.json()
+        setUploadedFlyer(result.flyer)
         toast.success('Flyer uploaded and processed successfully!')
-        router.push('/dashboard')
       } else {
@@ .. @@
     }
   }

+  const handleDownload = async () => {
+    if (!uploadedFlyer) return
+
+    try {
+      const response = await fetch(`/api/flyers/${uploadedFlyer.id}/download`)
+      if (response.ok) {
+        const blob = await response.blob()
+        const url = window.URL.createObjectURL(blob)
+        const a = document.createElement('a')
+        a.href = url
+        a.download = `${uploadedFlyer.title || 'flyer'}-with-qr.png`
+        document.body.appendChild(a)
+        a.click()
+        window.URL.revokeObjectURL(url)
+        document.body.removeChild(a)
+        toast.success('Flyer downloaded successfully!')
+      } else {
+        toast.error('Failed to download flyer')
+      }
+    } catch (error) {
+      console.error('Download error:', error)
+      toast.error('Failed to download flyer')
+    }
+  }
+
+  const handleViewFlyer = () => {
+    if (uploadedFlyer) {
+      window.open(`/f/${uploadedFlyer.id}`, '_blank')
+    }
+  }
+
   return (
     <div className="container mx-auto px-4 py-8">
       <div className="max-w-2xl mx-auto">
@@ .. @@
           <p className="text-muted-foreground">
             Upload your flyer and we'll transform it into an interactive web page using AI.
           </p>
+          {selectedTemplate && (
+            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
+              <p className="text-sm font-medium">Selected Template: {selectedTemplate.name}</p>
+              <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
+            </div>
+          )}
         </div>

-        <Card>
+        {!uploadedFlyer ? (
+          <Card>
+            <CardHeader>
+              <CardTitle>Upload Your Flyer</CardTitle>
+              <CardDescription>
+                Supported formats: PDF, PNG, JPG, JPEG (Max 10MB)
+              </CardDescription>
+            </CardHeader>
+            <CardContent>
+              <div className="space-y-4">
+                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
+                  <input
+                    type="file"
+                    accept=".pdf,.png,.jpg,.jpeg"
+                    onChange={handleFileSelect}
+                    className="hidden"
+                    id="file-upload"
+                    disabled={uploading}
+                  />
+                  <label
+                    htmlFor="file-upload"
+                    className="cursor-pointer flex flex-col items-center space-y-2"
+                  >
+                    <Upload className="h-12 w-12 text-muted-foreground" />
+                    <span className="text-sm font-medium">
+                      Click to upload or drag and drop
+                    </span>
+                    <span className="text-xs text-muted-foreground">
+                      PDF, PNG, JPG up to 10MB
+                    </span>
+                  </label>
+                </div>
+
+                {file && (
+                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
+                    <FileText className="h-5 w-5" />
+                    <span className="text-sm font-medium">{file.name}</span>
+                    <span className="text-xs text-muted-foreground">
+                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
+                    </span>
+                  </div>
+                )}
+
+                <Button
+                  onClick={handleUpload}
+                  disabled={!file || uploading}
+                  className="w-full"
+                  size="lg"
+                >
+                  {uploading ? (
+                    <>
+                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
+                      Processing...
+                    </>
+                  ) : (
+                    'Upload and Process'
+                  )}
+                </Button>
+              </div>
+            </CardContent>
+          </Card>
+        ) : (
+          <Card>
+            <CardHeader>
+              <CardTitle className="flex items-center gap-2">
+                <FileText className="h-5 w-5" />
+                Flyer Created Successfully!
+              </CardTitle>
+              <CardDescription>
+                Your flyer has been processed and is ready to share.
+              </CardDescription>
+            </CardHeader>
+            <CardContent>
+              <div className="space-y-4">
+                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
+                  <h3 className="font-semibold text-green-800">{uploadedFlyer.title}</h3>
+                  <p className="text-sm text-green-600 mt-1">
+                    Your interactive flyer is now live and ready to share!
+                  </p>
+                </div>
+
+                <div className="flex flex-col sm:flex-row gap-3">
+                  <Button onClick={handleViewFlyer} className="flex-1">
+                    <Eye className="mr-2 h-4 w-4" />
+                    View Flyer
+                  </Button>
+                  <Button onClick={handleDownload} variant="outline" className="flex-1">
+                    <Download className="mr-2 h-4 w-4" />
+                    Download with QR
+                  </Button>
+                </div>
+
+                <div className="p-3 bg-muted rounded-lg">
+                  <p className="text-sm font-medium mb-2">Share your flyer:</p>
+                  <div className="flex items-center gap-2">
+                    <input
+                      type="text"
+                      value={`${window.location.origin}/f/${uploadedFlyer.id}`}
+                      readOnly
+                      className="flex-1 px-3 py-2 text-sm border rounded bg-background"
+                    />
+                    <Button
+                      size="sm"
+                      onClick={() => {
+                        navigator.clipboard.writeText(`${window.location.origin}/f/${uploadedFlyer.id}`)
+                        toast.success('Link copied to clipboard!')
+                      }}
+                    >
+                      Copy
+                    </Button>
+                  </div>
+                </div>
+
+                <Button
+                  onClick={() => router.push('/dashboard')}
+                  variant="outline"
+                  className="w-full"
+                >
+                  Back to Dashboard
+                </Button>
+              </div>
+            </CardContent>
+          </Card>
+        )}
+
+        {!selectedTemplate && !uploadedFlyer && (
+          <Card>
           <CardHeader>
-            <CardTitle>Upload Your Flyer</CardTitle>
+            <CardTitle>Need a Template?</CardTitle>
             <CardDescription>
-              Supported formats: PDF, PNG, JPG, JPEG (Max 10MB)
+              Choose from our collection of professional templates to enhance your flyer.
             </CardDescription>
           </CardHeader>
           <CardContent>
-            <div className="space-y-4">
-              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
-                <input
-                  type="file"
-                  accept=".pdf,.png,.jpg,.jpeg"
-                  onChange={handleFileSelect}
-                  className="hidden"
-                  id="file-upload"
-                  disabled={uploading}
-                />
-                <label
-                  htmlFor="file-upload"
-                  className="cursor-pointer flex flex-col items-center space-y-2"
-                >
-                  <Upload className="h-12 w-12 text-muted-foreground" />
-                  <span className="text-sm font-medium">
-                    Click to upload or drag and drop
-                  </span>
-                  <span className="text-xs text-muted-foreground">
-                    PDF, PNG, JPG up to 10MB
-                  </span>
-                </label>
-              </div>
-
-              {file && (
-                <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
-                  <FileText className="h-5 w-5" />
-                  <span className="text-sm font-medium">{file.name}</span>
-                  <span className="text-xs text-muted-foreground">
-                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
-                  </span>
-                </div>
-              )}
-
-              <Button
-                onClick={handleUpload}
-                disabled={!file || uploading}
-                className="w-full"
-                size="lg"
-              >
-                {uploading ? (
-                  <>
-                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
-                    Processing...
-                  </>
-                ) : (
-                  'Upload and Process'
-                )}
+            <Button
+              onClick={() => router.push('/templates')}
+              variant="outline"
+              className="w-full"
+            >
+              <ExternalLink className="mr-2 h-4 w-4" />
+              Browse Templates
             </Button>
-            </div>
           </CardContent>
         </Card>
+        )}
       </div>
     </div>
   )