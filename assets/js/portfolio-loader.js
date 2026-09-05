// portfolio-loader.js
// Membaca projects.json lalu merender "Proyek Unggulan" dan "Portofolio Lain"
// Cara pakai: tambah project baru -> edit projects.json saja, file ini TIDAK perlu diubah.

function renderStack(stack) {
    return stack.map(function (s) {
        var cls = s.class ? s.class : '';
        return '<span class="' + cls + '">' + s.emoji + ' ' + s.label + '</span>';
    }).join('');
}

function renderMetrics(metrics) {
    return metrics.map(function (m) {
        return '<div class="metric"><div class="metric-value">' + m.value + '</div>' +
               '<div class="metric-label">' + m.label + '</div></div>';
    }).join('');
}

function renderLinks(links) {
    return links.map(function (l) {
        var disabledAttr = l.disabled ? ' style="opacity:0.6; cursor:not-allowed;"' : '';
        return '<a href="' + l.url + '" class="btn-demo ' + l.class + '"' + disabledAttr +
               ' target="_blank"><i class="' + l.icon + '"></i> ' + l.label + '</a>';
    }).join('');
}

function renderFeaturedCard(p) {
    return '' +
    '<div class="project-card featured">' +
        '<div class="project-content">' +
            '<div class="project-title">' + p.icon + ' ' + p.title +
                '<span class="featured-badge">' + p.badge + '</span>' +
            '</div>' +
            '<div class="project-stack">' + renderStack(p.stack) + '</div>' +
            '<div style="margin: 16px 0;">' +
                '<p style="margin-bottom: 10px;"><strong style="color: #dc2626;">🔥 Masalah Bisnis:</strong> ' + p.problem + '</p>' +
                '<p style="margin-bottom: 10px;"><strong style="color: #2563eb;">🛠️ Solusi & Tindakan:</strong> ' + p.solution + '</p>' +
                '<p style="margin-bottom: 10px;"><strong style="color: #16a34a;">📊 Dampak Bisnis:</strong> ' + p.impact + '</p>' +
            '</div>' +
            '<div class="project-metrics">' + renderMetrics(p.metrics) + '</div>' +
            '<div class="project-impact"><strong>Key Outcomes:</strong> ' + p.outcomes + '</div>' +
            '<div class="project-links">' + renderLinks(p.links) + '</div>' +
        '</div>' +
    '</div>';
}

function renderOtherItem(p) {
    var links = p.links.map(function (l) {
        var dimStyle = l.dim ? ' opacity:0.5;' : '';
        return '<a href="' + l.url + '" target="_blank" style="font-size:12px; margin-right:12px;' + dimStyle + '">' + l.label + ' →</a>';
    }).join(' ');
    var iconPrefix = p.icon ? p.icon + ' ' : '';
    return '<div class="secondary-item"><strong>' + iconPrefix + p.title + '</strong><br>' +
           p.description + '<br>' + links + '</div>';
}

async function loadPortfolio() {
    var featuredContainer = document.getElementById('featured-projects-grid');
    var otherContainer = document.getElementById('other-projects-grid');

    try {
        var res = await fetch('projects.json');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var data = await res.json();

        if (featuredContainer) {
            featuredContainer.innerHTML = data.featured_projects.map(renderFeaturedCard).join('');
        }
        if (otherContainer) {
            otherContainer.innerHTML = data.other_projects.map(renderOtherItem).join('');
        }
    } catch (err) {
        console.error('Gagal memuat projects.json:', err);
        if (featuredContainer) {
            featuredContainer.innerHTML = '<p style="color:#dc2626;">Gagal memuat data project. Pastikan projects.json ada di folder yang sama, dan (kalau dibuka lokal) jalankan lewat local server, bukan double-click file.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadPortfolio);
