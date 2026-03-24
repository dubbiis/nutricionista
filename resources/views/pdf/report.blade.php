<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
    /* Reset y base */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 11pt;
        color: #333;
        line-height: 1.5;
        margin: 40px;
    }
    h1 { color: #3d654d; font-size: 22pt; margin-bottom: 10px; }
    h2 {
        color: #3d654d;
        font-size: 14pt;
        border-bottom: 2px solid #3d654d;
        padding-bottom: 5px;
        margin-top: 30px;
        margin-bottom: 12px;
    }
    h3 {
        color: #3d654d;
        font-size: 12pt;
        margin-top: 15px;
        margin-bottom: 8px;
    }

    /* Portada */
    .header {
        text-align: center;
        margin-bottom: 30px;
        padding-top: 120px;
    }
    .brand {
        font-size: 28pt;
        color: #3d654d;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .subtitle {
        font-size: 13pt;
        color: #666;
        margin-top: 5px;
    }
    .patient-info {
        margin-top: 60px;
        font-size: 12pt;
    }
    .patient-info p {
        margin: 5px 0;
    }

    /* Tablas de alimentos */
    .food-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
    }
    .food-table th {
        background: #3d654d;
        color: white;
        padding: 8px 10px;
        text-align: left;
        font-size: 10pt;
    }
    .food-table td {
        padding: 6px 10px;
        border-bottom: 1px solid #ddd;
        font-size: 10pt;
        vertical-align: top;
    }
    .food-table tr:nth-child(even) {
        background: #f9f9f9;
    }
    .food-table .freq-label {
        width: 25%;
        font-weight: bold;
        color: #3d654d;
    }

    /* Énfasis */
    .emphasis {
        color: #3d654d;
        font-weight: bold;
    }

    /* Textos de sección */
    .section-text {
        margin: 10px 0;
        text-align: justify;
    }

    /* Badges para catálogo */
    .badge {
        display: inline-block;
        background: #e8f5e9;
        color: #3d654d;
        padding: 3px 10px;
        border-radius: 4px;
        margin: 3px 2px;
        font-size: 9pt;
    }
    .badge-list {
        margin: 8px 0;
    }

    /* Salto de página */
    .page-break {
        page-break-after: always;
    }

    /* Pie de página */
    .footer {
        text-align: center;
        font-size: 8pt;
        color: #999;
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
    }

    /* Lista con viñetas */
    ul.item-list {
        list-style: none;
        padding-left: 0;
    }
    ul.item-list li {
        padding: 3px 0;
        padding-left: 15px;
        position: relative;
    }
    ul.item-list li:before {
        content: "\2022";
        color: #3d654d;
        font-weight: bold;
        position: absolute;
        left: 0;
    }
</style>
</head>
<body>

{{-- ==================== PORTADA ==================== --}}
<div class="header">
    <div class="brand">{{ $settings['pdf_brand_name'] ?? 'MVM Nutrición Integrada' }}</div>
    <div class="subtitle">{{ $settings['pdf_brand_subtitle'] ?? 'Medicina de estilo de vida' }}</div>

    <div class="patient-info">
        <p><strong>Nombre:</strong> {{ $report->patient->name }} {{ $report->patient->surname }}</p>
        <p><strong>Fecha:</strong> {{ $report->created_at->format('d/m/Y') }}</p>
        @if($report->gender)
        <p><strong>Sexo:</strong> {{ ucfirst($report->gender) }}</p>
        @endif
    </div>
</div>

<div class="page-break"></div>

{{-- ==================== TEXTO INTRODUCTORIO ==================== --}}
@if(!empty($settings['pdf_intro_text']))
<h2>Introducción</h2>
<div class="section-text">{!! nl2br(e($settings['pdf_intro_text'])) !!}</div>
<div class="page-break"></div>
@endif

{{-- ==================== PATOLOGÍA / VALORACIÓN ==================== --}}
@if($report->pathology)
<h2>Valoración</h2>
<div class="section-text">{!! nl2br(e($report->pathology)) !!}</div>
@endif

{{-- ==================== ESTRATEGIAS HORMÉTICAS ==================== --}}
@if(!empty($catalogByGroup['estrategias']))
@foreach($catalogByGroup['estrategias'] as $sectionName => $items)
<h2>{{ $sectionName }}</h2>
<div class="badge-list">
    @foreach($items as $item)
    <span class="badge">{{ $item }}</span>
    @endforeach
</div>
@endforeach
@endif

{{-- ==================== TABLAS DE ALIMENTOS ==================== --}}
@foreach($foodTableTypes as $tableType)
@php
    $typeFoods = $foodsByTableType[$tableType->id] ?? collect();
@endphp
@if($typeFoods->isNotEmpty())

<h2>{{ mb_strtoupper($tableType->name) }}</h2>

@php
    $descKey = 'desc_' . \Illuminate\Support\Str::slug($tableType->name, '_');
    $description = $settings[$descKey] ?? null;
@endphp
@if($description)
<div class="section-text">{{ $description }}</div>
@endif

<table class="food-table">
<thead>
<tr>
    <th style="width: 25%;">Frecuencia</th>
    <th>{{ $tableType->name }}</th>
</tr>
</thead>
<tbody>
@for($fc = intval($tableType->frequency_count); $fc >= 0; $fc--)
@php
    $label = $tableType->{'fc' . $fc . '_label'};
    $fcFoods = $typeFoods->filter(fn($f) => intval($f->frequency) === $fc);
@endphp
@if($label && $label !== '---' && $fcFoods->isNotEmpty())
<tr>
    <td class="freq-label">{{ $label }}</td>
    <td>
        @foreach($fcFoods as $food)
            {{ $food->name }}@if($food->emphasis) <span class="emphasis">++</span>@endif
            @if(!$loop->last), @endif
        @endforeach
    </td>
</tr>
@endif
@endfor
</tbody>
</table>

@endif
@endforeach

{{-- ==================== INDICACIONES ==================== --}}
@if(!empty($catalogByGroup['indicaciones']))
<div class="page-break"></div>
<h2>INDICACIONES</h2>
@foreach($catalogByGroup['indicaciones'] as $sectionName => $items)
<h3>{{ $sectionName }}</h3>
<div class="badge-list">
    @foreach($items as $item)
    <span class="badge">{{ $item }}</span>
    @endforeach
</div>
@endforeach
@endif

{{-- ==================== LICUADOS ==================== --}}
@if(!empty($catalogByGroup['licuados']))
<h2>LICUADOS</h2>
@foreach($catalogByGroup['licuados'] as $sectionName => $items)
<h3>{{ $sectionName }}</h3>
<div class="badge-list">
    @foreach($items as $item)
    <span class="badge">{{ $item }}</span>
    @endforeach
</div>
@endforeach
@endif

{{-- ==================== SUPLEMENTACIÓN ==================== --}}
@if(!empty($catalogByGroup['suplementacion']))
<div class="page-break"></div>
<h2>SUPLEMENTACIÓN</h2>
@foreach($catalogByGroup['suplementacion'] as $sectionName => $items)
<h3>{{ $sectionName }}</h3>
<div class="badge-list">
    @foreach($items as $item)
    <span class="badge">{{ $item }}</span>
    @endforeach
</div>
@endforeach
@endif

{{-- ==================== PARÁMETROS ANALÍTICA ==================== --}}
@if(!empty($catalogByGroup['analitica']))
<h2>PARÁMETROS ANALÍTICA</h2>
@foreach($catalogByGroup['analitica'] as $sectionName => $items)
<h3>{{ $sectionName }}</h3>
<div class="badge-list">
    @foreach($items as $item)
    <span class="badge">{{ $item }}</span>
    @endforeach
</div>
@endforeach
@endif

{{-- ==================== REFERENCIAS BIBLIOGRÁFICAS ==================== --}}
@if(!empty($catalogByGroup['referencias']))
<h2>REFERENCIAS BIBLIOGRÁFICAS</h2>
@foreach($catalogByGroup['referencias'] as $sectionName => $items)
<h3>{{ $sectionName }}</h3>
<div class="badge-list">
    @foreach($items as $item)
    <span class="badge">{{ $item }}</span>
    @endforeach
</div>
@endforeach
@endif

{{-- ==================== ANOTACIONES ==================== --}}
@if($report->notes)
<h2>ANOTACIONES</h2>
<div class="section-text">{!! nl2br(e($report->notes)) !!}</div>
@endif

{{-- ==================== PIE ==================== --}}
<div class="footer">
    {{ $settings['pdf_footer_text'] ?? '' }}
</div>

</body>
</html>
