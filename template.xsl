<?xml version="1.0" encoding="UTF-8" ?>

<!--
 * ============================================================
 *
 * This file is a part of digiKam project
 * https://www.digikam.org
 *
 * Date        : 2008-06-22
 * Description : A clean look theme for the digiKam html gallery tool.
 *
 * SPDX-FileCopyrightText: 2008 by Gianluca Urgese <g dot urgese at jaone dot it>
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 *
 * ============================================================
 -->

<!DOCTYPE stylesheet [<!ENTITY raquo "&#187;">]>

<xsl:transform version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:exsl="http://exslt.org/common"
    extension-element-prefixes="exsl">

<xsl:template name="linkTagsImagePage">
	<link rel="first" href="{../image[position()=1]/full/@fileName}.html"></link>
	<link rel="last" href="{../image[position()=last()]/full/@fileName}.html"></link>
	<xsl:if test="position() &gt; 1">
		<link rel="prev" href="{preceding-sibling::image[position()=1]/full/@fileName}.html"></link>
	</xsl:if>
	<xsl:if test="position() &lt; last()">
		<link rel="next" href="{following-sibling::image[position()=1]/full/@fileName}.html"></link>
	</xsl:if>
	<xsl:choose>
		<xsl:when test="count(/collections/collection) &gt; 1">
			<link rel="up" href="../{../fileName}.html"></link>
			<link rel="top" href="../index.html"></link>
		</xsl:when>
		<xsl:otherwise>
			<link rel="up" href="../index.html"></link>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="linkTagsCollectionPage">
	<xsl:if test="count(/collections/collection) &gt; 1">
		<link rel="up" href="index.html"></link>
	</xsl:if>
</xsl:template>

<xsl:template name="imagePage">
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <title><xsl:value-of select="../name"/> (<xsl:value-of select="position()"/>/<xsl:value-of select="last()"/>)</title>

        <link rel="stylesheet" type="text/css" href="../pinpox/style.css"/>
	<xsl:call-template name="linkTagsImagePage"/>
        <script type="text/javascript">
            // Define navigation URLs for the script to use
            window.navigationData = {
                prevUrl: '<xsl:if test="position() &gt; 1"><xsl:value-of select="preceding-sibling::image[position()=1]/full/@fileName"/>.html</xsl:if>',
                nextUrl: '<xsl:if test="position() &lt; last()"><xsl:value-of select="following-sibling::image[position()=1]/full/@fileName"/>.html</xsl:if>'
            };
        </script>
        <script type="text/javascript" src="../pinpox/touch.js?v=1"></script>
    </head>
    <body id="imagePage">

        <h1>
            <a href="/albums">Albums</a>
            /
            <xsl:choose>
                <xsl:when test="count(/collections/collection) &gt; 1">
                    <a href="../index.html"><xsl:value-of select="$i18nCollectionList"/></a>
                    /
                    <a href="../{../fileName}.html"><xsl:value-of select="../name"/></a>
                </xsl:when>
                <xsl:otherwise>
                    <a href="../index.html"><xsl:value-of select="../name"/></a>
                </xsl:otherwise>
            </xsl:choose>

            / <xsl:value-of select="title"/>
            (<xsl:value-of select="position()"/>/<xsl:value-of select="last()"/>)
        </h1>


    <div id="content">
        <div class="colsx">
            <div class="image-container">
                <div class="nav-arrow left-arrow">
                    <xsl:choose>
                        <xsl:when test="position() &gt; 1">
                            <a href="{preceding-sibling::image[position()=1]/full/@fileName}.html">&#9664;</a>
                        </xsl:when>
                        <xsl:otherwise>
                            <span class="disabled">&#9664;</span>
                        </xsl:otherwise>
                    </xsl:choose>
                </div>
                <img src="{full/@fileName}" style="width:100% !important; max-width:none !important; height:auto !important; max-height:60vh !important; object-fit:cover !important; display:block !important;" />
                <div class="nav-arrow right-arrow">
                    <xsl:choose>
                        <xsl:when test="position() &lt; last()">
                            <a href="{following-sibling::image[position()=1]/full/@fileName}.html">&#9654;</a>
                        </xsl:when>
                        <xsl:otherwise>
                            <span class="disabled">&#9654;</span>
                        </xsl:otherwise>
                    </xsl:choose>
                </div>
            </div>
            <xsl:if test="original/@fileName != ''">
                <p>
                <a href="{original/@fileName}"><xsl:value-of select="$i18nOriginalImage"/></a>
                (<xsl:value-of select="original/@width"/>x<xsl:value-of select="original/@height"/>)
                </p>
            </xsl:if>
        </div>
        <div class="sidebar">
        <xsl:if test="string-length(description) > 0">
        <div class="image-caption">
            <div class="title-bar"><xsl:value-of select="title"/></div>
            <div class="caption-content">
                <xsl:call-template name="line-breaks">
                    <xsl:with-param name="text" select="description"/>
                </xsl:call-template>
            </div>
        </div>
        </xsl:if>
        <details class="metadata-details">
                <summary>Image Metadata</summary>
                <table class="metadata-table">
                    <tr><th><xsl:value-of select="$i18nexifimagemake"/></th><td><xsl:value-of select="exif/exifimagemake"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimagemodel"/></th><td><xsl:value-of select="exif/exifimagemodel"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimageorientation"/></th><td><xsl:value-of select="exif/exifimageorientation"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimagexresolution"/></th><td><xsl:value-of select="exif/exifimagexresolution"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimageyresolution"/></th><td><xsl:value-of select="exif/exifimageyresolution"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimageresolutionunit"/></th><td><xsl:value-of select="exif/exifimageresolutionunit"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimagedatetime"/></th><td><xsl:value-of select="exif/exifimagedatetime"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifimageycbcrpositioning"/></th><td><xsl:value-of select="exif/exifimageycbcrpositioning"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotoexposuretime"/></th><td><xsl:value-of select="exif/exifphotoexposuretime"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotofnumber"/></th><td><xsl:value-of select="exif/exifphotofnumber"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotoexposureprogram"/></th><td><xsl:value-of select="exif/exifphotoexposureprogram"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotoisospeedratings"/></th><td><xsl:value-of select="exif/exifphotoisospeedratings"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotoshutterspeedvalue"/></th><td><xsl:value-of select="exif/exifphotoshutterspeedvalue"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotoaperturevalue"/></th><td><xsl:value-of select="exif/exifphotoaperturevalue"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifphotofocallength"/></th><td><xsl:value-of select="exif/exifphotofocallength"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifgpsaltitude"/></th><td><xsl:value-of select="exif/exifgpsaltitude"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifgpslatitude"/></th><td><xsl:value-of select="exif/exifgpslatitude"/></td></tr>
                    <tr><th><xsl:value-of select="$i18nexifgpslongitude"/></th><td><xsl:value-of select="exif/exifgpslongitude"/></td></tr>
                </table>
            </details>
        </div>
    </div>
    </body>
    </html>
</xsl:template>


<xsl:template name="collectionPage">
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title><xsl:value-of select="name"/></title>

        <link rel="stylesheet" type="text/css" href="pinpox/style.css"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="mobile-web-app-capable" content="yes"/>
	<xsl:call-template name="linkTagsCollectionPage"/>
        <script type="text/javascript" src="pinpox/touch.js?v=1"></script>
    </head>
    <body id="collectionPage">
    <h1>
        <a href="/albums">albums</a>
        /
        <xsl:if test="count(/collections/collection) &gt; 1">
            <a href="index.html"><xsl:value-of select="$i18nCollectionList"/></a>
            /
        </xsl:if>
        <xsl:value-of select="name"/>
    </h1>
    <div id="content">
            <xsl:variable name="folder" select='fileName'/>
            <xsl:for-each select="image">
                <span class="thumbnail">
                    <a href='{$folder}/{full/@fileName}.html'>
                        <img src="{$folder}/{thumbnail/@fileName}" width="{thumbnail/@width}" height="{thumbnail/@height}" />
                    </a>
                    <a href='{$folder}/{full/@fileName}.html'>
                        <xsl:value-of select="title"/>
                    </a>
                </span>
                <exsl:document href='{$folder}/{full/@fileName}.html'>
                    <xsl:call-template name="imagePage"/>
                </exsl:document>
            </xsl:for-each>
    </div>
    </body>
    </html>
</xsl:template>


<xsl:template name="collectionListPage">
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title><xsl:value-of select="$i18nCollectionList"/></title>

        <link rel="stylesheet" type="text/css" href="pinpox/style.css"/>
    </head>
    <body>
    <h1><a href="/albums">albums</a> / <xsl:value-of select="$i18nCollectionList"/></h1>
    <div id="content">
            <xsl:for-each select="collections/collection">
                <xsl:sort select="name" order="ascending" data-type="text" />
                <span class="thumbnail">
                    <a href="{fileName}.html">
                        <!-- Use first image as collection image -->
                        <img src="{fileName}/{image[1]/thumbnail/@fileName}"
                        	width="{image[1]/thumbnail/@width}"
                        	height="{image[1]/thumbnail/@height}" />
                        <xsl:value-of select="name"/>
                    </a>
                </span>
                <exsl:document href="{fileName}.html">
                    <xsl:call-template name="collectionPage"/>
                </exsl:document>
            </xsl:for-each>
    </div> <!-- /content -->
    </body>
    </html>
</xsl:template>


<!-- Template to convert newlines to paragraph tags -->
<xsl:template name="line-breaks">
    <xsl:param name="text"/>
    <xsl:choose>
        <xsl:when test="contains($text, '&#10;')">
            <p><xsl:value-of select="substring-before($text, '&#10;')"/></p>
            <xsl:call-template name="line-breaks">
                <xsl:with-param name="text" select="substring-after($text, '&#10;')"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <p><xsl:value-of select="$text"/></p>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="/">
    <xsl:choose>
        <xsl:when test="count(collections/collection) &gt; 1">
            <xsl:call-template name="collectionListPage"/>
        </xsl:when>
        <xsl:otherwise>
            <xsl:for-each select="collections/collection">
                <xsl:call-template name="collectionPage"/>
            </xsl:for-each>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

</xsl:transform>
