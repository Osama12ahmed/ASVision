import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import * as fabric from 'fabric';

/**
 * Product Mockup & Printable Area Definitions
 */
const PRINT_AREAS = {
  notebook: {
    front: { topRatio: 0.16, leftRatio: 0.22, widthRatio: 0.56, heightRatio: 0.68 },
    back: { topRatio: 0.16, leftRatio: 0.22, widthRatio: 0.56, heightRatio: 0.68 }
  },
  tshirt: {
    front: { topRatio: 0.24, leftRatio: 0.30, widthRatio: 0.40, heightRatio: 0.46 },
    back: { topRatio: 0.22, leftRatio: 0.30, widthRatio: 0.40, heightRatio: 0.46 }
  },
  hoodie: {
    front: { topRatio: 0.26, leftRatio: 0.30, widthRatio: 0.40, heightRatio: 0.44 },
    back: { topRatio: 0.24, leftRatio: 0.30, widthRatio: 0.40, heightRatio: 0.44 }
  },
  frame: {
    front: { topRatio: 0.16, leftRatio: 0.18, widthRatio: 0.64, heightRatio: 0.68 },
    back: { topRatio: 0.16, leftRatio: 0.18, widthRatio: 0.64, heightRatio: 0.68 }
  },
  accessories: {
    front: { topRatio: 0.20, leftRatio: 0.20, widthRatio: 0.60, heightRatio: 0.60 },
    back: { topRatio: 0.20, leftRatio: 0.20, widthRatio: 0.60, heightRatio: 0.60 }
  }
};

const DesignCanvas = forwardRef(function DesignCanvas(
  {
    productId = 'notebook',
    productTitle = 'Product',
    selectedColor = null,
    onHasDesignChange,
    onActiveSideChange,
    onAddToCartPreview,
  },
  ref
) {
  const containerRef = useRef(null);
  const canvasElementRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const isSettingUpRef = useRef(false);

  // Active view: 'front' or 'back'
  const [activeSide, setActiveSide] = useState('front');
  const [hasDesign, setHasDesign] = useState({ front: false, back: false });
  const [loadingBg, setLoadingBg] = useState(true);
  const [showPrintAreaGuide, setShowPrintAreaGuide] = useState(true);

  // In-memory persistent design data for Front and Back
  const sideDesignsRef = useRef({
    front: null,
    back: null
  });

  // Calculate Product Mockup Image URL
  const getProductImageUrl = useCallback(
    (side) => {
      // 1. Try public/products/[product-id]/[side].png
      const primaryUrl = `/products/${productId}/${side}.png`;
      return primaryUrl;
    },
    [productId]
  );

  // Set Fabric Default Controls Styling
  useEffect(() => {
    try {
      if (fabric.FabricObject) {
        fabric.FabricObject.prototype.set({
          transparentCorners: false,
          cornerColor: '#FF6D06',
          cornerStrokeColor: '#ffffff',
          borderColor: '#FF6D06',
          cornerSize: 11,
          cornerStyle: 'circle',
          padding: 6,
          borderDashArray: [4, 4],
        });
      }
    } catch (e) {
      console.warn('Fabric control styling initialization:', e);
    }
  }, []);

  // Update background mockup image on canvas
  const updateCanvasBackground = useCallback(
    async (canvas, side) => {
      if (!canvas) return;
      setLoadingBg(true);

      const imgUrl = getProductImageUrl(side);
      const canvasWidth = canvas.width || 500;
      const canvasHeight = canvas.height || 500;

      try {
        let bgImg = null;
        try {
          bgImg = await fabric.FabricImage.fromURL(imgUrl, { crossOrigin: 'anonymous' });
        } catch {
          // Fallback if /products/... not found: try /[productId]/[side].png
          const fallbackUrl = `/${productId}/${side}.png`;
          try {
            bgImg = await fabric.FabricImage.fromURL(fallbackUrl, { crossOrigin: 'anonymous' });
          } catch {
            // If still fails, create clean mock backdrop
            console.warn(`Product image not found for ${productId}/${side}`);
          }
        }

        if (bgImg && bgImg.width && bgImg.height) {
          // Scale to fit canvas with containment & nice padding
          const scale = Math.min((canvasWidth * 0.95) / bgImg.width, (canvasHeight * 0.95) / bgImg.height);
          bgImg.set({
            scaleX: scale,
            scaleY: scale,
            left: (canvasWidth - bgImg.width * scale) / 2,
            top: (canvasHeight - bgImg.height * scale) / 2,
            originX: 'left',
            originY: 'top',
            selectable: false,
            evented: false,
          });
          canvas.backgroundImage = bgImg;
        } else {
          canvas.backgroundImage = null;
        }

        canvas.renderAll();
      } catch (err) {
        console.error('Error loading background mockup:', err);
      } finally {
        setLoadingBg(false);
      }
    },
    [getProductImageUrl, productId]
  );

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasElementRef.current || !containerRef.current) return;
    if (fabricCanvasRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;

    const canvas = new fabric.Canvas(canvasElementRef.current, {
      width,
      height,
      preserveObjectStacking: true,
      selection: true,
      backgroundColor: 'transparent',
    });

    fabricCanvasRef.current = canvas;

    // Load initial background
    updateCanvasBackground(canvas, activeSide);

    // Object modification listeners
    const handleObjectModified = () => {
      if (fabricCanvasRef.current) {
        const objects = fabricCanvasRef.current.getObjects();
        const designObjs = objects.filter((o) => o !== fabricCanvasRef.current.backgroundImage);
        const hasArt = designObjs.length > 0;
        setHasDesign((prev) => {
          const next = { ...prev, [activeSide]: hasArt };
          onHasDesignChange?.(next[activeSide]);
          return next;
        });
      }
    };

    canvas.on('object:added', handleObjectModified);
    canvas.on('object:removed', handleObjectModified);
    canvas.on('object:modified', handleObjectModified);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0 || !fabricCanvasRef.current) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW > 0 && newH > 0) {
        fabricCanvasRef.current.setDimensions({ width: newW, height: newH });
        updateCanvasBackground(fabricCanvasRef.current, activeSide);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  // Save current design objects into memory ref
  const saveCurrentSideDesign = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects().filter((obj) => obj !== canvas.backgroundImage);
    if (objects.length === 0) {
      sideDesignsRef.current[activeSide] = null;
      return;
    }

    // Save serialized objects
    const objectsData = objects.map((obj) => obj.toObject([
      'left', 'top', 'scaleX', 'scaleY', 'angle', 'opacity', 'originX', 'originY', 'src'
    ]));

    sideDesignsRef.current[activeSide] = objectsData;
  }, [activeSide]);

  // Restore design objects for the active side
  const restoreSideDesign = useCallback(
    async (side) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // 1. Clear existing design objects from canvas
      const currentObjects = canvas.getObjects().slice();
      currentObjects.forEach((obj) => {
        if (obj !== canvas.backgroundImage) {
          canvas.remove(obj);
        }
      });

      // 2. Load the side background mockup image
      await updateCanvasBackground(canvas, side);

      // 3. Restore side design if saved
      const savedObjects = sideDesignsRef.current[side];
      if (savedObjects && Array.isArray(savedObjects) && savedObjects.length > 0) {
        for (const objData of savedObjects) {
          try {
            if (objData.src) {
              const img = await fabric.FabricImage.fromURL(objData.src, { crossOrigin: 'anonymous' });
              img.set({
                left: objData.left,
                top: objData.top,
                scaleX: objData.scaleX || 1,
                scaleY: objData.scaleY || 1,
                angle: objData.angle || 0,
                originX: objData.originX || 'center',
                originY: objData.originY || 'center',
                opacity: objData.opacity !== undefined ? objData.opacity : 1,
              });
              canvas.add(img);
            }
          } catch (e) {
            console.error('Failed to restore design object:', e);
          }
        }
        setHasDesign((prev) => ({ ...prev, [side]: true }));
        onHasDesignChange?.(true);
      } else {
        setHasDesign((prev) => ({ ...prev, [side]: false }));
        onHasDesignChange?.(false);
      }

      canvas.renderAll();
    },
    [updateCanvasBackground, onHasDesignChange]
  );

  // Switch Active Side (Front <-> Back)
  const handleSideSwitch = async (newSide) => {
    if (newSide === activeSide || isSettingUpRef.current) return;
    isSettingUpRef.current = true;

    // 1. Save current side design
    saveCurrentSideDesign();

    // 2. Update active side state
    setActiveSide(newSide);
    onActiveSideChange?.(newSide);

    // 3. Restore target side design
    await restoreSideDesign(newSide);

    isSettingUpRef.current = false;
  };

  // Add Image to the Active Canvas (Center within Print Area)
  const addImageToCanvas = useCallback(
    async (imageUrl) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas || !imageUrl) return;

      const canvasWidth = canvas.width || 500;
      const canvasHeight = canvas.height || 500;

      // Get target print area config
      const pConfig = PRINT_AREAS[productId]?.[activeSide] || {
        topRatio: 0.2,
        leftRatio: 0.25,
        widthRatio: 0.5,
        heightRatio: 0.6,
      };

      const printAreaCenterX = (pConfig.leftRatio + pConfig.widthRatio / 2) * canvasWidth;
      const printAreaCenterY = (pConfig.topRatio + pConfig.heightRatio / 2) * canvasHeight;
      const maxAllowedWidth = pConfig.widthRatio * canvasWidth * 0.85;
      const maxAllowedHeight = pConfig.heightRatio * canvasHeight * 0.85;

      try {
        const img = await fabric.FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' });
        if (!img.width || !img.height) return;

        // Auto scale to fit comfortably in print area
        const scale = Math.min(maxAllowedWidth / img.width, maxAllowedHeight / img.height, 0.6);

        img.set({
          left: printAreaCenterX,
          top: printAreaCenterY,
          originX: 'center',
          originY: 'center',
          scaleX: scale,
          scaleY: scale,
          cornerColor: '#FF6D06',
          borderColor: '#FF6D06',
        });

        // Store source URL for serialization/switching
        img.src = imageUrl;

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        // Update state
        setHasDesign((prev) => ({ ...prev, [activeSide]: true }));
        onHasDesignChange?.(true);
      } catch (err) {
        console.error('Error adding image to canvas:', err);
      }
    },
    [productId, activeSide, onHasDesignChange]
  );

  // Remove Design from active side
  const removeActiveDesign = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects().slice();
    objects.forEach((obj) => {
      if (obj !== canvas.backgroundImage) {
        canvas.remove(obj);
      }
    });

    sideDesignsRef.current[activeSide] = null;
    canvas.discardActiveObject();
    canvas.renderAll();

    setHasDesign((prev) => ({ ...prev, [activeSide]: false }));
    onHasDesignChange?.(false);
  }, [activeSide, onHasDesignChange]);

  // Export Data for parent ref
  useImperativeHandle(ref, () => ({
    addImage: addImageToCanvas,
    removeDesign: removeActiveDesign,
    setSide: handleSideSwitch,
    getExportImage: () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return null;
      return canvas.toDataURL({ format: 'png', quality: 0.95 });
    },
    getActiveSide: () => activeSide,
    hasCurrentDesign: () => hasDesign[activeSide],
  }));

  // Re-sync background if product changes
  useEffect(() => {
    if (fabricCanvasRef.current) {
      sideDesignsRef.current = { front: null, back: null };
      setHasDesign({ front: false, back: false });
      updateCanvasBackground(fabricCanvasRef.current, activeSide);
    }
  }, [productId]);

  // Calculate printable boundary box styling
  const pConfig = PRINT_AREAS[productId]?.[activeSide] || {
    topRatio: 0.2,
    leftRatio: 0.25,
    widthRatio: 0.5,
    heightRatio: 0.6,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-[#141518] border border-white/10 shadow-2xl group flex items-center justify-center select-none"
    >
      {/* HTML5 Canvas Element managed by Fabric */}
      <canvas ref={canvasElementRef} className="w-full h-full block" />

      {/* Loading Spinner for Mockup */}
      {loadingBg && (
        <div className="absolute inset-0 bg-[#141518]/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 space-y-2">
          <div className="w-8 h-8 border-3 border-white/20 border-t-[#FF6D06] rounded-full animate-spin" />
          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
            Loading {activeSide === 'front' ? 'Front' : 'Back'} View...
          </span>
        </div>
      )}

      {/* Top Left: Interactive 2D Editor Badge */}
      <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#FF6D06] animate-pulse" />
        <span className="text-[11px] font-bold text-white tracking-wide">
          Interactive Design Studio
        </span>
      </div>

      {/* Top Right: Front / Back Switcher Tabs */}
      <div className="absolute top-4 right-4 z-10 flex items-center p-1 bg-black/80 backdrop-blur-md border border-white/15 rounded-full shadow-xl">
        <button
          type="button"
          onClick={() => handleSideSwitch('front')}
          className={`px-3.5 py-1 text-xs font-extrabold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSide === 'front'
              ? 'bg-[#FF6D06] text-white shadow-md shadow-[#FF6D06]/40'
              : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
          }`}
        >
          <span>Front</span>
          {hasDesign.front && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        </button>

        <button
          type="button"
          onClick={() => handleSideSwitch('back')}
          className={`px-3.5 py-1 text-xs font-extrabold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSide === 'back'
              ? 'bg-[#FF6D06] text-white shadow-md shadow-[#FF6D06]/40'
              : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
          }`}
        >
          <span>Back</span>
          {hasDesign.back && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        </button>
      </div>

      {/* Printable Area Visual Guide (Dashed Box) */}
      {showPrintAreaGuide && (
        <div
          style={{
            top: `${pConfig.topRatio * 100}%`,
            left: `${pConfig.leftRatio * 100}%`,
            width: `${pConfig.widthRatio * 100}%`,
            height: `${pConfig.heightRatio * 100}%`,
          }}
          className="absolute border-2 border-dashed border-[#FF6D06]/50 rounded-xl pointer-events-none z-[5] transition-all flex items-start justify-end p-1.5 opacity-60 group-hover:opacity-90"
        >
          <span className="text-[9px] font-black uppercase tracking-wider text-[#FF6D06] bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#FF6D06]/30">
            Print Area
          </span>
        </div>
      )}

      {/* Bottom Left Controls: Toggle Guide & Remove Design */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowPrintAreaGuide(!showPrintAreaGuide)}
          className="bg-black/70 hover:bg-black text-white/80 hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-white/15 shadow-lg backdrop-blur-md transition-all cursor-pointer flex items-center gap-1"
          title="Toggle printable boundary guidelines"
        >
          <span>{showPrintAreaGuide ? '👁️ Hide Bounds' : '🎯 Show Bounds'}</span>
        </button>

        {hasDesign[activeSide] && (
          <button
            type="button"
            onClick={removeActiveDesign}
            className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md transition-all cursor-pointer flex items-center gap-1"
            title="Remove uploaded graphic from current side"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Remove Design</span>
          </button>
        )}
      </div>

    </div>
  );
});

export default DesignCanvas;
