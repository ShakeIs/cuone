param(
  [string]$Version = 'v1'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$repoRoot = Split-Path -Parent $PSScriptRoot
$publicRoot = Join-Path $repoRoot 'src\public'
$sourcePortfolioRoot = Join-Path $publicRoot 'photos\portfolio'
$outputRoot = Join-Path $publicRoot "photos\portfolio-responsive\$Version"

$squareTargetWidths = @(360, 640, 830)
$desktopBannerWidths = @(960, 1680)
$mobileBannerWidths = @(321)

function Ensure-Directory {
  param([string]$Path)

  if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function Get-TargetWidths {
  param(
    [int]$SourceWidth,
    [int[]]$PreferredWidths
  )

  $targetWidths = New-Object System.Collections.Generic.List[int]

  foreach ($width in $PreferredWidths) {
    if ($width -lt $SourceWidth) {
      $targetWidths.Add($width)
    }
  }

  $largestWidth = [Math]::Min($SourceWidth, $PreferredWidths[-1])
  if (-not $targetWidths.Contains($largestWidth)) {
    $targetWidths.Add($largestWidth)
  }

  return $targetWidths.ToArray()
}

function Save-ResizedPng {
  param(
    [System.Drawing.Image]$Image,
    [int]$Width,
    [string]$DestinationPath
  )

  $height = [int][Math]::Round($Image.Height * ($Width / [double]$Image.Width))
  $bitmap = New-Object System.Drawing.Bitmap($Width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  try {
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.DrawImage($Image, 0, 0, $Width, $height)
    $bitmap.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

function Save-Variant {
  param(
    [System.Drawing.Image]$Image,
    [string]$SourcePath,
    [int]$Width,
    [string]$DestinationPath
  )

  if ($Width -eq $Image.Width) {
    Copy-Item -LiteralPath $SourcePath -Destination $DestinationPath -Force
    return
  }

  Save-ResizedPng -Image $Image -Width $Width -DestinationPath $DestinationPath
}

function Export-Variants {
  param(
    [string]$SourcePath,
    [string]$DestinationDirectory,
    [int[]]$PreferredWidths
  )

  Ensure-Directory -Path $DestinationDirectory

  $image = [System.Drawing.Image]::FromFile($SourcePath)

  try {
    $targetWidths = Get-TargetWidths -SourceWidth $image.Width -PreferredWidths $PreferredWidths
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($SourcePath)

    foreach ($width in $targetWidths) {
      $destinationPath = Join-Path $DestinationDirectory "$baseName-$width.png"
      Save-Variant `
        -Image $image `
        -SourcePath $SourcePath `
        -Width $width `
        -DestinationPath $destinationPath
      Write-Host "Generated $destinationPath"
    }
  }
  finally {
    $image.Dispose()
  }
}

Ensure-Directory -Path $outputRoot

$squareImages = Get-ChildItem -Path $sourcePortfolioRoot -File -Recurse |
  Where-Object {
    $_.Extension -eq '.png' -and
    $_.DirectoryName -ne $sourcePortfolioRoot
  }

foreach ($image in $squareImages) {
  $relativeDirectory = $image.DirectoryName.Substring($sourcePortfolioRoot.Length).TrimStart('\')
  $destinationDirectory = Join-Path $outputRoot $relativeDirectory

  Export-Variants `
    -SourcePath $image.FullName `
    -DestinationDirectory $destinationDirectory `
    -PreferredWidths $squareTargetWidths
}

Export-Variants `
  -SourcePath (Join-Path $publicRoot 'photos\Phones-horizontal.png') `
  -DestinationDirectory (Join-Path $outputRoot 'banner') `
  -PreferredWidths $desktopBannerWidths

Export-Variants `
  -SourcePath (Join-Path $sourcePortfolioRoot 'mobiles_horizontal.png') `
  -DestinationDirectory (Join-Path $outputRoot 'banner') `
  -PreferredWidths $mobileBannerWidths
