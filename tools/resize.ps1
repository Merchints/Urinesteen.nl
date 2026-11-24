# Verkleint en comprimeert een foto naar JPEG met de ingebouwde .NET-beeldbewerking van Windows.
# Gebruik: powershell -File tools/resize.ps1 -In bron.jpg -Out doel.jpg -Width 1600 [-Quality 78] [-CropRatio 1.5] [-FocusY 0.5]
# CropRatio = breedte/hoogte na uitsnijden (optioneel). FocusY (0-1) bepaalt welk deel van de hoogte bewaard blijft.
param(
  [Parameter(Mandatory)] [string]$In,
  [Parameter(Mandatory)] [string]$Out,
  [int]$Width = 1600,
  [int]$Quality = 78,
  [double]$CropRatio = 0,
  [double]$FocusY = 0.5,
  [double]$FocusX = 0.5
)
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile((Resolve-Path $In))
try {
  $sx = 0; $sy = 0; $sw = $src.Width; $sh = $src.Height
  if ($CropRatio -gt 0) {
    if ($sw / $sh -gt $CropRatio) { $nw = [int]($sh * $CropRatio); $sx = [int](($sw - $nw) * $FocusX); $sw = $nw }
    else { $nh = [int]($sw / $CropRatio); $sy = [int](($sh - $nh) * $FocusY); $sh = $nh }
  }
  $w = [Math]::Min($Width, $sw); $h = [int]($sh * $w / $sw)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $sx, $sy, $sw, $sh, [System.Drawing.GraphicsUnit]::Pixel)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)
  $bmp.Save($Out, $codec, $ep)
  $g.Dispose(); $bmp.Dispose()
  "{0} -> {1}x{2} {3} KB" -f (Split-Path $Out -Leaf), $w, $h, [int]((Get-Item $Out).Length / 1KB)
} finally { $src.Dispose() }
