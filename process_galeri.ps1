Add-Type -AssemblyName System.Drawing

$srcDir = "d:\karro-wedding\asset"
$outDir = "d:\karro-wedding\client\public\images\galeri"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

$files = Get-ChildItem -Path $srcDir -Filter "*.jpg" -File
$files += Get-ChildItem -Path $srcDir -Filter "*.jpeg" -File

foreach ($f in $files) {
    $inPath = $f.FullName
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($f.Name).ToLower() -replace '[ _]+', '-'
    $outPath = Join-Path $outDir "$baseName.jpg"

    $img = [System.Drawing.Image]::FromFile($inPath)

    # Check EXIF orientation (PropertyTagOrientation = 0x0112 = 274)
    if ($img.PropertyIdList -contains 274) {
        $orientation = $img.GetPropertyItem(274).Value[0]
        switch ($orientation) {
            2 { $img.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
            3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
            4 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipX) }
            5 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
            6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
            7 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
            8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
        }
        Write-Host "Auto-rotated $f.Name (Orientation: $orientation)"
    }

    # Max dimension 1600px
    $maxDim = 1600
    $w = $img.Width
    $h = $img.Height

    if ($w -gt $maxDim -or $h -gt $maxDim) {
        if ($w -gt $h) {
            $newW = $maxDim
            $newH = [int](($h * $maxDim) / $w)
        } else {
            $newH = $maxDim
            $newW = [int](($w * $maxDim) / $h)
        }
    } else {
        $newW = $w
        $newH = $h
    }

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graph.DrawImage($img, 0, 0, $newW, $newH)
    $bmp.Save($outPath, $codec, $encoderParams)

    $graph.Dispose()
    $bmp.Dispose()
    $img.Dispose()

    $outSize = (Get-Item $outPath).Length / 1024
    Write-Host "Processed: $baseName.jpg ($newW x $newH, $([math]::Round($outSize, 1)) KB)"
}

