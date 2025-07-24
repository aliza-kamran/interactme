@@ .. @@
   try {
     const formData = await request.formData()
     const file = formData.get('file') as File
+    const templateId = formData.get('templateId') as string

     if (!file) {
@@ .. @@
       category: extractedData.category || null,
+      templateId: templateId || null,
       generatedUrl: `${process.env.NEXTAUTH_URL}/f/${flyerId}`,
@@ .. @@
     return NextResponse.json({
       message: 'Flyer uploaded and processed successfully',
-      flyerId: flyer.id,
+      flyer: {
+        id: flyer.id,
+        title: flyer.title,
+        generatedUrl: flyer.generatedUrl
+      },
       extractedData